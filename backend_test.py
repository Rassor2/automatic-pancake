#!/usr/bin/env python3
"""
Backend API Testing Script for CareerPath Education & Career Guidance Website
Tests all backend endpoints according to test_result.md requirements
"""

import requests
import json
import sys
from typing import Dict, Any, List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://educareermap-1.preview.emergentagent.com')
API_BASE = f"{BACKEND_URL}/api"

class APITester:
    def __init__(self):
        self.results = {
            'categories': [],
            'articles': [],
            'newsletter': [],
            'contact': [],
            'summary': {'passed': 0, 'failed': 0, 'total': 0}
        }
        
    def log_result(self, category: str, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        result = {
            'test': test_name,
            'passed': passed,
            'details': details
        }
        self.results[category].append(result)
        self.results['summary']['total'] += 1
        if passed:
            self.results['summary']['passed'] += 1
            print(f"✅ {test_name}")
        else:
            self.results['summary']['failed'] += 1
            print(f"❌ {test_name}: {details}")
    
    def test_categories_api(self):
        """Test Categories API endpoints"""
        print("\n🔍 Testing Categories API...")
        
        # Test 1: GET /api/categories - Should return 6 categories
        try:
            response = requests.get(f"{API_BASE}/categories", timeout=10)
            if response.status_code == 200:
                categories = response.json()
                if len(categories) == 6:
                    self.log_result('categories', 'GET /api/categories returns 6 categories', True)
                else:
                    self.log_result('categories', 'GET /api/categories returns 6 categories', False, 
                                  f"Expected 6 categories, got {len(categories)}")
            else:
                self.log_result('categories', 'GET /api/categories returns 6 categories', False, 
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('categories', 'GET /api/categories returns 6 categories', False, str(e))
        
        # Test 2: GET /api/categories/studies-degrees - Should return category details
        try:
            response = requests.get(f"{API_BASE}/categories/studies-degrees", timeout=10)
            if response.status_code == 200:
                category = response.json()
                if category.get('slug') == 'studies-degrees' and category.get('name') == 'Studies & Degrees':
                    self.log_result('categories', 'GET /api/categories/studies-degrees returns category details', True)
                else:
                    self.log_result('categories', 'GET /api/categories/studies-degrees returns category details', False,
                                  f"Invalid category data: {category}")
            else:
                self.log_result('categories', 'GET /api/categories/studies-degrees returns category details', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('categories', 'GET /api/categories/studies-degrees returns category details', False, str(e))
        
        # Test 3: GET /api/categories/nonexistent - Should return 404
        try:
            response = requests.get(f"{API_BASE}/categories/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_result('categories', 'GET /api/categories/nonexistent returns 404', True)
            else:
                self.log_result('categories', 'GET /api/categories/nonexistent returns 404', False,
                              f"Expected 404, got HTTP {response.status_code}")
        except Exception as e:
            self.log_result('categories', 'GET /api/categories/nonexistent returns 404', False, str(e))
    
    def test_articles_api(self):
        """Test Articles API endpoints"""
        print("\n📰 Testing Articles API...")
        
        # Test 1: GET /api/articles - Should return 12 articles (paginated)
        try:
            response = requests.get(f"{API_BASE}/articles", timeout=10)
            if response.status_code == 200:
                articles = response.json()
                if len(articles) == 12:
                    self.log_result('articles', 'GET /api/articles returns 12 articles', True)
                else:
                    self.log_result('articles', 'GET /api/articles returns 12 articles', False,
                                  f"Expected 12 articles, got {len(articles)}")
            else:
                self.log_result('articles', 'GET /api/articles returns 12 articles', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles returns 12 articles', False, str(e))
        
        # Test 2: GET /api/articles/featured - Should return 3 featured articles
        try:
            response = requests.get(f"{API_BASE}/articles/featured", timeout=10)
            if response.status_code == 200:
                articles = response.json()
                if len(articles) == 3:
                    # Verify all are featured
                    all_featured = all(article.get('featured', False) for article in articles)
                    if all_featured:
                        self.log_result('articles', 'GET /api/articles/featured returns 3 featured articles', True)
                    else:
                        self.log_result('articles', 'GET /api/articles/featured returns 3 featured articles', False,
                                      "Not all returned articles are marked as featured")
                else:
                    self.log_result('articles', 'GET /api/articles/featured returns 3 featured articles', False,
                                  f"Expected 3 featured articles, got {len(articles)}")
            else:
                self.log_result('articles', 'GET /api/articles/featured returns 3 featured articles', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles/featured returns 3 featured articles', False, str(e))
        
        # Test 3: GET /api/articles/which-career-should-you-choose-in-2025 - Should return full article
        try:
            response = requests.get(f"{API_BASE}/articles/which-career-should-you-choose-in-2025", timeout=10)
            if response.status_code == 200:
                article = response.json()
                if (article.get('slug') == 'which-career-should-you-choose-in-2025' and 
                    article.get('title') and article.get('content')):
                    self.log_result('articles', 'GET /api/articles/which-career-should-you-choose-in-2025 returns full article', True)
                else:
                    self.log_result('articles', 'GET /api/articles/which-career-should-you-choose-in-2025 returns full article', False,
                                  "Article missing required fields (slug, title, content)")
            else:
                self.log_result('articles', 'GET /api/articles/which-career-should-you-choose-in-2025 returns full article', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles/which-career-should-you-choose-in-2025 returns full article', False, str(e))
        
        # Test 4: GET /api/articles/nonexistent - Should return 404
        try:
            response = requests.get(f"{API_BASE}/articles/nonexistent", timeout=10)
            if response.status_code == 404:
                self.log_result('articles', 'GET /api/articles/nonexistent returns 404', True)
            else:
                self.log_result('articles', 'GET /api/articles/nonexistent returns 404', False,
                              f"Expected 404, got HTTP {response.status_code}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles/nonexistent returns 404', False, str(e))
        
        # Test 5: GET /api/articles/category/career-paths - Should return articles in category
        try:
            response = requests.get(f"{API_BASE}/articles/category/career-paths", timeout=10)
            if response.status_code == 200:
                articles = response.json()
                if len(articles) > 0:
                    # Verify all articles belong to career-paths category
                    all_correct_category = all(article.get('category') == 'career-paths' for article in articles)
                    if all_correct_category:
                        self.log_result('articles', 'GET /api/articles/category/career-paths returns category articles', True)
                    else:
                        self.log_result('articles', 'GET /api/articles/category/career-paths returns category articles', False,
                                      "Some articles don't belong to career-paths category")
                else:
                    self.log_result('articles', 'GET /api/articles/category/career-paths returns category articles', False,
                                  "No articles returned for career-paths category")
            else:
                self.log_result('articles', 'GET /api/articles/category/career-paths returns category articles', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles/category/career-paths returns category articles', False, str(e))
        
        # Test 6: GET /api/articles/search?q=career - Should return matching articles
        try:
            response = requests.get(f"{API_BASE}/articles/search?q=career", timeout=10)
            if response.status_code == 200:
                articles = response.json()
                if len(articles) > 0:
                    # Verify articles contain "career" in title or excerpt
                    matching_articles = []
                    for article in articles:
                        title = article.get('title', '').lower()
                        excerpt = article.get('excerpt', '').lower()
                        if 'career' in title or 'career' in excerpt:
                            matching_articles.append(article)
                    
                    if len(matching_articles) > 0:
                        self.log_result('articles', 'GET /api/articles/search?q=career returns matching articles', True)
                    else:
                        self.log_result('articles', 'GET /api/articles/search?q=career returns matching articles', False,
                                      "No articles contain 'career' in title or excerpt")
                else:
                    self.log_result('articles', 'GET /api/articles/search?q=career returns matching articles', False,
                                  "No articles returned for search query 'career'")
            else:
                self.log_result('articles', 'GET /api/articles/search?q=career returns matching articles', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('articles', 'GET /api/articles/search?q=career returns matching articles', False, str(e))
    
    def test_newsletter_api(self):
        """Test Newsletter API endpoints"""
        print("\n📧 Testing Newsletter API...")
        
        # Test 1: POST /api/newsletter/subscribe with valid data - Should succeed
        try:
            data = {"email": "newuser@test.com", "name": "Test User"}
            response = requests.post(f"{API_BASE}/newsletter/subscribe", json=data, timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log_result('newsletter', 'POST /api/newsletter/subscribe with valid data succeeds', True)
                else:
                    self.log_result('newsletter', 'POST /api/newsletter/subscribe with valid data succeeds', False,
                                  f"Success flag is false: {result}")
            else:
                self.log_result('newsletter', 'POST /api/newsletter/subscribe with valid data succeeds', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('newsletter', 'POST /api/newsletter/subscribe with valid data succeeds', False, str(e))
        
        # Test 2: POST /api/newsletter/subscribe with same email - Should handle duplicate gracefully
        try:
            data = {"email": "newuser@test.com", "name": "Test User"}
            response = requests.post(f"{API_BASE}/newsletter/subscribe", json=data, timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log_result('newsletter', 'POST /api/newsletter/subscribe handles duplicate email gracefully', True)
                else:
                    self.log_result('newsletter', 'POST /api/newsletter/subscribe handles duplicate email gracefully', False,
                                  f"Success flag is false for duplicate: {result}")
            else:
                self.log_result('newsletter', 'POST /api/newsletter/subscribe handles duplicate email gracefully', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('newsletter', 'POST /api/newsletter/subscribe handles duplicate email gracefully', False, str(e))
        
        # Test 3: POST /api/newsletter/subscribe with invalid email - Should return validation error
        try:
            data = {"email": "invalid-email", "name": "Test User"}
            response = requests.post(f"{API_BASE}/newsletter/subscribe", json=data, timeout=10)
            if response.status_code == 422:  # FastAPI validation error
                self.log_result('newsletter', 'POST /api/newsletter/subscribe with invalid email returns validation error', True)
            else:
                self.log_result('newsletter', 'POST /api/newsletter/subscribe with invalid email returns validation error', False,
                              f"Expected 422 validation error, got HTTP {response.status_code}")
        except Exception as e:
            self.log_result('newsletter', 'POST /api/newsletter/subscribe with invalid email returns validation error', False, str(e))
    
    def test_contact_api(self):
        """Test Contact API endpoints"""
        print("\n📞 Testing Contact API...")
        
        # Test 1: POST /api/contact with valid data - Should succeed
        try:
            data = {
                "name": "John Doe",
                "email": "john.doe@example.com",
                "subject": "Test Subject",
                "message": "This is a test message for the contact form."
            }
            response = requests.post(f"{API_BASE}/contact", json=data, timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log_result('contact', 'POST /api/contact with valid data succeeds', True)
                else:
                    self.log_result('contact', 'POST /api/contact with valid data succeeds', False,
                                  f"Success flag is false: {result}")
            else:
                self.log_result('contact', 'POST /api/contact with valid data succeeds', False,
                              f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result('contact', 'POST /api/contact with valid data succeeds', False, str(e))
        
        # Test 2: POST /api/contact with missing required fields - Should return validation error
        try:
            data = {"name": "John Doe"}  # Missing email and message
            response = requests.post(f"{API_BASE}/contact", json=data, timeout=10)
            if response.status_code == 422:  # FastAPI validation error
                self.log_result('contact', 'POST /api/contact with missing fields returns validation error', True)
            else:
                self.log_result('contact', 'POST /api/contact with missing fields returns validation error', False,
                              f"Expected 422 validation error, got HTTP {response.status_code}")
        except Exception as e:
            self.log_result('contact', 'POST /api/contact with missing fields returns validation error', False, str(e))
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Backend API Tests for: {API_BASE}")
        print("=" * 60)
        
        self.test_categories_api()
        self.test_articles_api()
        self.test_newsletter_api()
        self.test_contact_api()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['summary']['total']}")
        print(f"Passed: {self.results['summary']['passed']}")
        print(f"Failed: {self.results['summary']['failed']}")
        
        if self.results['summary']['failed'] > 0:
            print("\n❌ FAILED TESTS:")
            for category in ['categories', 'articles', 'newsletter', 'contact']:
                failed_tests = [test for test in self.results[category] if not test['passed']]
                if failed_tests:
                    print(f"\n{category.upper()}:")
                    for test in failed_tests:
                        print(f"  - {test['test']}: {test['details']}")
        
        success_rate = (self.results['summary']['passed'] / self.results['summary']['total']) * 100
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return self.results['summary']['failed'] == 0

if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)