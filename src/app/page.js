import { gql } from '@apollo/client';
import client from './lib/apollo-client';
import styles from './blog.module.scss';

export default async function Blog() {
  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          edges {
            node {
              id
              title
              content
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `,
  });

  const posts = data.posts.edges;

  return (
    <div className={styles.container}>
      <header className={styles.blogHeader}>
        <h1>Blog</h1>
        <p>Acompanhe nossas últimas postagens!</p>
      </header>
      <ul className={styles.postList}>
        {posts.map(({ node }) => (
          <li key={node.id} className={styles.postCard}>
            {node.featuredImage?.node?.sourceUrl ? (
              <img
                src={node.featuredImage.node.sourceUrl}
                alt={node.title}
                className={styles.featuredImage}
              />
            ) : (
              <div className={styles.noImage}>Sem imagem</div>
            )}
            <h2 className={styles.postTitle}>{node.title}</h2>
            <p className={styles.postExcerpt}>
              {node.content.slice(0, 150)}...
            </p>
            <div className={styles.postMeta}>
              <span>By {node.author?.node?.name}</span>
            </div>
            <a href={`/post/${node.id}`} className={styles.readMore}>
              Leia mais
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
