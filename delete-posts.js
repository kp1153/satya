const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'pi3xvutd',
  dataset: 'production',
  token: 'skwp4iy8OUCGGZIseSOXHJu95nkKIUWbRZWSuaBVrb3tgFHbKw95Vn3uG1LQ8GwQ3fv3Ew39uyR777GgBF4ZL43QDPoGIAtbFyE8RfPiRL1AEuvGdMpRxlsoGvEgGwHKyEFLZLZD8gJhsozOOkDWmQzcAcuH8cw4vS2H3ADbqNvDmkJWi9oW',
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function deleteAllPosts() {
  const query = '*[_type == "post"]';
  const posts = await client.fetch(query);
  
  console.log(`Deleting ${posts.length} posts...`);
  
  for (const post of posts) {
    await client.delete(post._id);
    console.log(`✓ Deleted: ${post.slug.current}`);
  }
  
  console.log('All posts deleted!');
}

deleteAllPosts();