'use client'; // Necessário para Client Components

import { useState } from 'react';
import styles from '../blog.module.scss';


function stripHtml(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  

const POSTS_PER_PAGE = 4;

export default function BlogClient({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);

  // Lógica de paginação
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

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
    <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(posts.length / POSTS_PER_PAGE) }).map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setCurrentPage(idx + 1)}
            className={currentPage === idx + 1 ? styles.active : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>
  </div>
  );
}
