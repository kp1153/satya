const fetch = require('node-fetch');
const fs = require('fs');
const { createClient } = require('@sanity/client');

const WP_API = 'https://telescopetimes.com/wp-json/wp/v2';
const CLOUDINARY_CLOUD = 'djv8yxjfp';
const CLOUDINARY_PRESET = 'dulatti';

const sanity = createClient({
  projectId: 'pi3xvutd',
  dataset: 'production',
  token: 'skmotpxVgcdVYX7z3PJzhJptqcUpUqu7csS96WmxqlfJTszXnJxdJ69Lqrgpw3eCpk7q58ljqTZBa1u6MhHNj8uzu1YLveKj97bpZwvR3w6I1CROZpMhkmb1zWuWAm8pbEDIEzl13uqlrLMIw6A9O6ShVyp1D8BHcCTtDewCnO8brqfDraya',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const categoryMap = {
  'art-cinema': 'manoranjan',
  'business-affairs': 'commerce',
  'cover-story-news': 'bharat',
  'crime-and-law-news': 'punjab',
  'e-paper': 'vividh',
  'fashion-and-style-news': 'manoranjan',
  'food-and-travel': 'vividh',
  'health-and-education-news': 'vividh',
  'international-news': 'vishwa'
};

async function uploadToCloudinary(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const base64 = buffer.toString('base64');
    
    const formData = new URLSearchParams();
    formData.append('file', `data:image/jpeg;base64,${base64}`);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    formData.append('folder', 'wordpress-migration');

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
      { method: 'POST', body: formData }
    );
    
    const data = await uploadRes.json();
    return data.secure_url;
  } catch (err) {
    console.error('Image upload failed:', imageUrl, err.message);
    return null;
  }
}

async function getOrCreateCategory(slug, name) {
  const query = `*[_type == "category" && slug.current == $slug][0]`;
  let cat = await sanity.fetch(query, { slug });
  
  if (!cat) {
    cat = await sanity.create({
      _type: 'category',
      name: name,
      slug: { _type: 'slug', current: slug },
    });
    console.log(`Created category: ${name}`);
  }
  
  return cat._id;
}

async function fetchAllPosts() {
  let page = 1;
  let allPosts = [];
  let hasMore = true;

  while (hasMore) {
    const url = `${WP_API}/posts?page=${page}&per_page=100&_embed`;
    console.log(`Fetching page ${page}...`);
    
    const res = await fetch(url);
    if (!res.ok) {
      hasMore = false;
      break;
    }
    
    const posts = await res.json();
    if (posts.length === 0) {
      hasMore = false;
    } else {
      allPosts = allPosts.concat(posts);
      page++;
    }
  }

  console.log(`Total posts fetched: ${allPosts.length}`);
  return allPosts;
}

function extractYouTubeUrls(content) {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(`https://www.youtube.com/watch?v=${match[1]}`);
  }
  return matches;
}

function htmlToPortableText(html, youtubeUrls) {
  const blocks = [];
  
  const tempDiv = html
    .replace(/<p>/g, '\n\n')
    .replace(/<\/p>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n\n')
    .filter(t => t.trim());

  tempDiv.forEach(text => {
    if (text.trim()) {
      blocks.push({
        _type: 'block',
        _key: `block_${Date.now()}_${Math.random()}`,
        style: 'normal',
        children: [{ _type: 'span', text: text.trim() }],
      });
    }
  });

  youtubeUrls.forEach(url => {
    blocks.push({
      _type: 'youtube',
      _key: `youtube_${Date.now()}_${Math.random()}`,
      url: url,
    });
  });

  return blocks;
}

async function migratePost(wpPost, index, total) {
  try {
    console.log(`\n[${index + 1}/${total}] Processing: ${wpPost.title.rendered}`);
    
    const slug = wpPost.slug;
    const existingQuery = `*[_type == "post" && slug.current == $slug][0]`;
    const existing = await sanity.fetch(existingQuery, { slug });
    
    if (existing) {
      console.log(`Skipped (already exists): ${slug}`);
      return;
    }

    let mainImage = null;
    if (wpPost._embedded && wpPost._embedded['wp:featuredmedia']) {
      const featuredMedia = wpPost._embedded['wp:featuredmedia'][0];
      if (featuredMedia && featuredMedia.source_url) {
        console.log('Uploading featured image...');
        mainImage = await uploadToCloudinary(featuredMedia.source_url);
      }
    }

    const wpCategories = wpPost._embedded && wpPost._embedded['wp:term'] 
      ? wpPost._embedded['wp:term'][0] 
      : [];
    
    let categoryRef = null;
    if (wpCategories.length > 0) {
      const wpCatSlug = wpCategories[0].slug;
      const mappedSlug = categoryMap[wpCatSlug] || 'vividh';
      const catName = wpCategories[0].name;
      categoryRef = await getOrCreateCategory(mappedSlug, catName);
    } else {
      categoryRef = await getOrCreateCategory('vividh', 'विविध');
    }

    const youtubeUrls = extractYouTubeUrls(wpPost.content.rendered);
    const content = htmlToPortableText(wpPost.content.rendered, youtubeUrls);

    const sanityPost = {
      _type: 'post',
      title: wpPost.title.rendered,
      slug: { _type: 'slug', current: slug },
      content: content,
      mainImage: mainImage,
      publishedAt: wpPost.date,
      category: { _type: 'reference', _ref: categoryRef },
      views: 0,
    };

    await sanity.create(sanityPost);
    console.log(`✓ Migrated: ${slug}`);
    
  } catch (err) {
    console.error(`✗ Failed: ${wpPost.slug}`, err.message);
  }
}

async function main() {
  console.log('Starting WordPress to Sanity migration...\n');
  
  const posts = await fetchAllPosts();
  
  for (let i = 0; i < posts.length; i++) {
    await migratePost(posts[i], i, posts.length);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✓ Migration completed!');
}

main();