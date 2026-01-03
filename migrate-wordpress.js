const { createClient } = require('@sanity/client');
const fetch = require('node-fetch');

const client = createClient({
  projectId: 'pi3xvutd',
  dataset: 'production',
  token: 'skwp4iy8OUCGGZIseSOXHJu95nkKIUWbRZWSuaBVrb3tgFHbKw95Vn3uG1LQ8GwQ3fv3Ew39uyR777GgBF4ZL43QDPoGIAtbFyE8RfPiRL1AEuvGdMpRxlsoGvEgGwHKyEFLZLZD8gJhsozOOkDWmQzcAcuH8cw4vS2H3ADbqNvDmkJWi9oW',
  useCdn: false,
  apiVersion: '2024-01-01'
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

async function createCategories() {
  const categories = [
    { _id: 'bharat', _type: 'category', name: 'भारत', slug: { current: 'bharat' } },
    { _id: 'vishwa', _type: 'category', name: 'विश्व', slug: { current: 'vishwa' } },
    { _id: 'punjab', _type: 'category', name: 'पंजाब', slug: { current: 'punjab' } },
    { _id: 'khel', _type: 'category', name: 'खेल', slug: { current: 'khel' } },
    { _id: 'manoranjan', _type: 'category', name: 'मनोरंजन', slug: { current: 'manoranjan' } },
    { _id: 'commerce', _type: 'category', name: 'वाणिज्य', slug: { current: 'commerce' } },
    { _id: 'vividh', _type: 'category', name: 'विविध', slug: { current: 'vividh' } }
  ];

  console.log('Creating categories...');
  for (const cat of categories) {
    try {
      await client.createOrReplace(cat);
      console.log(`✓ Category: ${cat.name}`);
    } catch (error) {
      console.log(`✗ Error: ${cat.name} - ${error.message}`);
    }
  }
}

async function uploadToCloudinary(imageUrl) {
  try {
    const formData = new URLSearchParams();
    formData.append('file', imageUrl);
    formData.append('upload_preset', 'dulatti');
    
    const response = await fetch('https://api.cloudinary.com/v1_1/djv8yxjfp/image/upload', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error(`Cloudinary upload error: ${error.message}`);
    return null;
  }
}

function htmlToPlainText(html) {
  if (!html) return '';
  
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Replace <p> and <br> with newlines
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  
  // Remove all other HTML tags
  text = text.replace(/<[^>]+>/g, '');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#8217;/g, "'");
  text = text.replace(/&#8216;/g, "'");
  text = text.replace(/&#8220;/g, '"');
  text = text.replace(/&#8221;/g, '"');
  text = text.replace(/&#8211;/g, '–');
  text = text.replace(/&#8212;/g, '—');
  text = text.replace(/&#8230;/g, '...');
  text = text.replace(/&hellip;/g, '...');
  text = text.replace(/\[&hellip;\]/g, '...');
  
  // Clean up whitespace
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
  text = text.replace(/[ \t]+/g, ' ');
  text = text.trim();
  
  return text;
}

function textToPortableText(text) {
  if (!text) {
    return [{
      _type: 'block',
      children: [{ _type: 'span', text: 'No content available' }],
      markDefs: [],
      style: 'normal'
    }];
  }
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  
  if (paragraphs.length === 0) {
    return [{
      _type: 'block',
      children: [{ _type: 'span', text: text }],
      markDefs: [],
      style: 'normal'
    }];
  }
  
  return paragraphs.map(para => ({
    _type: 'block',
    children: [{ _type: 'span', text: para.trim() }],
    markDefs: [],
    style: 'normal'
  }));
}

async function fetchAllPosts() {
  const allPosts = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    console.log(`Fetching page ${page}...`);
    try {
      const response = await fetch(`https://telescopetimes.com/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed`);
      
      if (!response.ok) break;
      
      const posts = await response.json();
      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts.push(...posts);
        page++;
      }
    } catch (error) {
      console.error(`Error fetching page ${page}: ${error.message}`);
      break;
    }
  }
  
  return allPosts;
}

async function migratePost(post) {
  try {
    const title = htmlToPlainText(post.title.rendered);
    const slug = post.slug;
    const htmlContent = post.content.rendered || '';
    const plainContent = htmlToPlainText(htmlContent);
    const publishedAt = post.date;
    
    // Get category
    let sanityCategory = 'vividh'; // default
    try {
      const categoryId = post.categories[0];
      const categoryResponse = await fetch(`https://telescopetimes.com/wp-json/wp/v2/categories/${categoryId}`);
      const categoryData = await categoryResponse.json();
      const wpCategory = categoryData.slug;
      sanityCategory = categoryMap[wpCategory] || 'vividh';
    } catch (error) {
      console.log(`  Category fetch failed, using default: vividh`);
    }
    
    // Upload featured image to Cloudinary
    let cloudinaryUrl = null;
    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
      const wpImageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      cloudinaryUrl = await uploadToCloudinary(wpImageUrl);
      if (cloudinaryUrl) {
        console.log(`  ✓ Image uploaded to Cloudinary`);
      }
    }
    
    // Convert content to Portable Text
    const bodyBlocks = textToPortableText(plainContent);
    
    // Create Sanity post with CORRECT field names
    const sanityPost = {
      _type: 'post',
      title: title,
      slug: { current: slug },
      content: bodyBlocks,  // ✓ Schema में 'content' field है
      publishedAt: publishedAt,
      category: { _type: 'reference', _ref: sanityCategory },
      views: 0
    };
    
    // Add optional fields
    if (cloudinaryUrl) {
      sanityPost.mainImage = cloudinaryUrl;  // String URL, not reference
    }
    
    await client.create(sanityPost);
    return { success: true, slug };
  } catch (error) {
    return { success: false, slug: post.slug, error: error.message };
  }
}

async function main() {
  console.log('=== WordPress to Sanity Migration ===\n');
  
  // Step 1: Create categories
  await createCategories();
  
  // Step 2: Test with 1 post first
  console.log('\n=== Testing with 1 post ===');
  const testResponse = await fetch('https://telescopetimes.com/wp-json/wp/v2/posts?per_page=1&_embed');
  const testPosts = await testResponse.json();
  
  if (testPosts.length > 0) {
    const testTitle = htmlToPlainText(testPosts[0].title.rendered);
    console.log(`Testing: ${testTitle}`);
    const testResult = await migratePost(testPosts[0]);
    
    if (testResult.success) {
      console.log(`✓ Test successful: ${testResult.slug}`);
      console.log('\n✓ Check Sanity Studio to verify content is correct!');
      console.log('✓ If content looks good, uncomment full migration below.\n');
    } else {
      console.log(`✗ Test failed: ${testResult.error}`);
      console.log('\n✗ Fix errors before running full migration!');
      return;
    }
  }
  
  // Step 3: Full migration
console.log('\n=== Starting full migration ===');
const posts = await fetchAllPosts();
console.log(`Total posts to migrate: ${posts.length}\n`);

let successCount = 0;
let failCount = 0;

for (let i = 0; i < posts.length; i++) {
  const post = posts[i];
  const title = htmlToPlainText(post.title.rendered);
  console.log(`[${i + 1}/${posts.length}] ${title}`);
  
  const result = await migratePost(post);
  
  if (result.success) {
    successCount++;
    console.log(`  ✓ ${result.slug}`);
  } else {
    failCount++;
    console.log(`  ✗ ${result.slug}: ${result.error}`);
  }
  
  // Small delay to avoid rate limits
  await new Promise(resolve => setTimeout(resolve, 100));
}

console.log(`\n=== Migration Complete ===`);
console.log(`Success: ${successCount}`);
console.log(`Failed: ${failCount}`);
}

main().catch(console.error);