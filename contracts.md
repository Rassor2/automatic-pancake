# API Contracts - CareerPath Education & Career Guidance Website

## Overview
This document outlines the API contracts for replacing mock data with backend integration.

## Mock Data Location
- `/app/frontend/src/data/mock.js` - Contains articles, categories, and helper functions

## API Endpoints

### Articles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/articles` | Get all articles (with pagination) |
| GET | `/api/articles/:slug` | Get single article by slug |
| GET | `/api/articles/featured` | Get featured articles |
| GET | `/api/articles/search?q=` | Search articles |
| GET | `/api/articles/category/:categorySlug` | Get articles by category |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:slug` | Get single category by slug |

### Newsletter
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |

## Data Models

### Article
```json
{
  "id": "string",
  "slug": "string (unique)",
  "title": "string",
  "excerpt": "string",
  "content": "string (HTML)",
  "category": "string (category slug)",
  "categoryName": "string",
  "image": "string (URL)",
  "author": "string",
  "publishedAt": "datetime",
  "readingTime": "number",
  "featured": "boolean"
}
```

### Category
```json
{
  "id": "string",
  "slug": "string (unique)",
  "name": "string",
  "description": "string",
  "icon": "string",
  "articleCount": "number"
}
```

### NewsletterSubscriber
```json
{
  "id": "string",
  "email": "string (unique)",
  "name": "string (optional)",
  "subscribedAt": "datetime",
  "active": "boolean"
}
```

### ContactMessage
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "subject": "string (optional)",
  "message": "string",
  "submittedAt": "datetime",
  "read": "boolean"
}
```

## Frontend Integration Points

### HomePage.jsx
- `featuredArticles` → GET `/api/articles/featured`
- `articles` → GET `/api/articles?limit=6`
- `categories` → GET `/api/categories`

### ArticlePage.jsx
- `getArticleBySlug(slug)` → GET `/api/articles/:slug`
- `getRelatedArticles()` → GET `/api/articles/category/:categorySlug?exclude=:currentSlug&limit=3`

### CategoryPage.jsx
- `getCategoryBySlug(slug)` → GET `/api/categories/:slug`
- `getArticlesByCategory(slug)` → GET `/api/articles/category/:slug`

### ArticlesPage.jsx
- `articles` → GET `/api/articles`
- `categories` → GET `/api/categories`

### SearchPage.jsx
- `searchArticles(query)` → GET `/api/articles/search?q=:query`

### NewsletterPage.jsx
- Form submission → POST `/api/newsletter/subscribe`

### ContactPage.jsx
- Form submission → POST `/api/contact`

## Database Seeding
Initial data from mock.js will be seeded into MongoDB on first run.
