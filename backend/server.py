from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import re


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="CareerPath API", description="Education & Career Guidance API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ==================== MODELS ====================

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    description: str
    icon: str
    articleCount: int = 0

class CategoryResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    name: str
    description: str
    icon: str
    articleCount: int

class Article(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    categoryName: str
    image: str
    author: str
    publishedAt: str
    readingTime: int
    featured: bool = False

class ArticleResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    category: str
    categoryName: str
    image: str
    author: str
    publishedAt: str
    readingTime: int
    featured: bool

class ArticleListResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    slug: str
    title: str
    excerpt: str
    category: str
    categoryName: str
    image: str
    author: str
    publishedAt: str
    readingTime: int
    featured: bool

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    name: Optional[str] = None

class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: Optional[str] = None
    subscribedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    active: bool = True

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    submittedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    read: bool = False


# ==================== SEED DATA ====================

SEED_CATEGORIES = [
    {
        "id": "cat-1",
        "slug": "studies-degrees",
        "name": "Studies & Degrees",
        "description": "Explore different educational paths, university programs, and degree options to make informed decisions about your academic future.",
        "icon": "GraduationCap",
        "articleCount": 3
    },
    {
        "id": "cat-2",
        "slug": "career-paths",
        "name": "Career Paths",
        "description": "Discover various career trajectories, industry insights, and professional development opportunities across different sectors.",
        "icon": "TrendingUp",
        "articleCount": 2
    },
    {
        "id": "cat-3",
        "slug": "job-market-salaries",
        "name": "Job Market & Salaries",
        "description": "Stay informed about current job market trends, salary expectations, and employment statistics across industries.",
        "icon": "DollarSign",
        "articleCount": 2
    },
    {
        "id": "cat-4",
        "slug": "skills-training",
        "name": "Skills & Training",
        "description": "Learn about in-demand skills, professional certifications, and training programs to boost your career prospects.",
        "icon": "Award",
        "articleCount": 2
    },
    {
        "id": "cat-5",
        "slug": "career-change",
        "name": "Career Change",
        "description": "Navigate career transitions successfully with expert advice, success stories, and practical strategies.",
        "icon": "RefreshCw",
        "articleCount": 2
    },
    {
        "id": "cat-6",
        "slug": "tips-advice",
        "name": "Tips & Advice",
        "description": "Practical guidance on job searching, interviews, networking, and professional growth strategies.",
        "icon": "Lightbulb",
        "articleCount": 1
    }
]

SEED_ARTICLES = [
    {
        "id": "art-1",
        "slug": "which-career-should-you-choose-in-2025",
        "title": "Which Career Should You Choose in 2025?",
        "excerpt": "Explore the most promising career options for 2025 and learn how to align your skills and interests with market demands.",
        "category": "career-paths",
        "categoryName": "Career Paths",
        "image": "https://images.unsplash.com/photo-1622675103136-e4b90c9a33d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85",
        "author": "Sarah Mitchell",
        "publishedAt": "2025-01-15",
        "readingTime": 8,
        "featured": True,
        "content": """<h2>Understanding the 2025 Job Landscape</h2>
<p>The job market in 2025 presents unprecedented opportunities for those who understand where the economy is heading. With technological advancement accelerating and new industries emerging, making the right career choice has never been more important—or more complex.</p>
<p>This comprehensive guide will help you navigate the evolving professional landscape, identify high-growth sectors, and align your career decisions with both market demands and personal fulfillment.</p>

<h2>Top Growing Industries in 2025</h2>
<p>Several industries are experiencing remarkable growth, creating abundant opportunities for job seekers at all experience levels.</p>
<h3>Technology and Artificial Intelligence</h3>
<p>The tech sector continues to dominate job creation, with artificial intelligence, machine learning, and data science leading the charge. Companies across all industries are seeking professionals who can leverage these technologies to drive innovation and efficiency.</p>
<p>Key roles include AI engineers, data scientists, cybersecurity specialists, and cloud architects. These positions often offer competitive salaries and excellent growth potential, making them attractive options for both recent graduates and career changers.</p>

<h3>Healthcare and Biotechnology</h3>
<p>An aging population and advances in medical science have created sustained demand for healthcare professionals. Beyond traditional medical roles, biotechnology and digital health are opening new career pathways.</p>
<p>Telemedicine specialists, health informatics experts, and biotechnology researchers are particularly sought after. These roles combine technical skills with the rewarding nature of healthcare work.</p>

<h3>Sustainable Energy and Environmental Services</h3>
<p>Climate change concerns and policy shifts have accelerated growth in renewable energy and environmental consulting. Solar and wind energy technicians, sustainability consultants, and environmental engineers are increasingly valuable.</p>

<h2>How to Identify Your Ideal Career Path</h2>
<p>Choosing the right career requires honest self-assessment combined with market research. Consider these key factors:</p>
<h3>Assess Your Skills and Interests</h3>
<p>Begin by evaluating your natural abilities and genuine interests. What tasks come easily to you? What topics capture your attention for hours? The intersection of skill and passion often points toward sustainable career satisfaction.</p>
<p>Consider taking professional assessment tests to gain objective insights into your strengths and preferences. These tools can reveal career paths you might not have considered.</p>

<h3>Research Market Demand</h3>
<p>While passion matters, practical considerations cannot be ignored. Research salary ranges, job availability, and growth projections for careers that interest you. Government labor statistics and industry reports provide reliable data for informed decisions.</p>

<h3>Consider Long-Term Trajectory</h3>
<p>Think beyond entry-level positions to understand where a career path could lead over 10-20 years. Some fields offer clear advancement opportunities, while others may plateau earlier. Understanding these trajectories helps set realistic expectations.</p>

<h2>Skills That Transfer Across Industries</h2>
<p>Regardless of which specific career you choose, certain skills remain valuable across virtually all industries:</p>
<ul>
<li><strong>Digital Literacy:</strong> Comfort with technology and ability to learn new software quickly</li>
<li><strong>Communication:</strong> Clear written and verbal expression, including virtual communication skills</li>
<li><strong>Critical Thinking:</strong> Ability to analyze problems and develop creative solutions</li>
<li><strong>Adaptability:</strong> Willingness to learn and adjust to changing circumstances</li>
<li><strong>Emotional Intelligence:</strong> Understanding and managing relationships effectively</li>
</ul>

<h2>Making Your Decision</h2>
<p>The best career choice balances personal fulfillment with practical viability. Start by identifying three to five potential paths that interest you, then research each thoroughly. Talk to professionals in those fields, seek internship or shadowing opportunities, and consider entry-level positions that could serve as stepping stones.</p>
<p>Remember that career decisions aren't permanent. Many successful professionals have changed directions multiple times, using each experience to build toward their ultimate goals. The key is making thoughtful, informed choices and remaining open to growth opportunities.</p>

<h2>Conclusion</h2>
<p>Choosing a career in 2025 requires balancing opportunity with authenticity. By understanding market trends, honestly assessing your abilities, and remaining adaptable, you can build a career that provides both financial security and personal satisfaction. Start exploring today—your future self will thank you.</p>"""
    },
    {
        "id": "art-2",
        "slug": "university-vs-vocational-training",
        "title": "University vs Vocational Training: Which Is Better?",
        "excerpt": "Compare traditional university education with vocational training to determine which path best suits your goals and circumstances.",
        "category": "studies-degrees",
        "categoryName": "Studies & Degrees",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb258ZW58MHx8fHwxNzY3MTI5MzM3fDA&ixlib=rb-4.1.0&q=85",
        "author": "Michael Chen",
        "publishedAt": "2025-01-12",
        "readingTime": 10,
        "featured": True,
        "content": """<h2>The Great Education Debate</h2>
<p>For decades, a university degree was considered the golden ticket to career success. Today, that assumption is being challenged as vocational training programs prove their value in preparing students for high-demand, well-paying careers. Understanding the strengths and limitations of each path is essential for making an informed educational choice.</p>

<h2>Understanding University Education</h2>
<p>University education provides broad academic knowledge alongside specialized study in a chosen field. Programs typically last three to four years for undergraduate degrees, with opportunities for advanced study through master's and doctoral programs.</p>
<h3>Advantages of University Education</h3>
<p><strong>Comprehensive Knowledge Base:</strong> University programs emphasize critical thinking, research skills, and broad understanding across disciplines. This foundation can be valuable for careers requiring complex analysis and adaptability.</p>
<p><strong>Networking Opportunities:</strong> Universities bring together students from diverse backgrounds, creating valuable professional networks. Alumni connections often prove beneficial throughout one's career.</p>
<p><strong>Credential Recognition:</strong> Many professional fields require or prefer university degrees. For careers in medicine, law, academia, and certain business roles, a degree remains essential.</p>

<h3>Considerations for University Education</h3>
<p><strong>Time Investment:</strong> Four-year programs represent a significant time commitment, delaying entry into the workforce compared to shorter alternatives.</p>
<p><strong>Financial Cost:</strong> Tuition fees, living expenses, and opportunity costs make university education a substantial financial investment. Student debt can take years to repay.</p>

<h2>Understanding Vocational Training</h2>
<p>Vocational training, also known as technical education or trade school, focuses on practical skills for specific occupations. Programs range from several months to two years, combining classroom instruction with hands-on training.</p>
<h3>Advantages of Vocational Training</h3>
<p><strong>Job-Ready Skills:</strong> Vocational programs emphasize practical competencies that employers need immediately. Graduates often enter the workforce fully prepared for their chosen trade.</p>
<p><strong>Shorter Duration:</strong> Most programs can be completed in two years or less, allowing faster entry into the workforce and earlier earning potential.</p>
<p><strong>Lower Cost:</strong> Reduced tuition and shorter duration make vocational training significantly more affordable than university education.</p>

<h2>Making Your Choice</h2>
<p>Consider these questions when deciding between paths:</p>
<ul>
<li>What specific career interests you, and what credentials does it require?</li>
<li>Do you prefer hands-on work or abstract thinking?</li>
<li>What are your financial circumstances and risk tolerance for educational debt?</li>
<li>How important is entering the workforce quickly versus spending time in education?</li>
</ul>

<h2>Conclusion</h2>
<p>Neither university nor vocational training is universally "better"—the right choice depends on your goals, circumstances, and preferences. Focus on understanding yourself and your target career rather than following assumptions about which path leads to success.</p>"""
    },
    {
        "id": "art-3",
        "slug": "most-in-demand-jobs-2025",
        "title": "Most In-Demand Jobs in 2025",
        "excerpt": "Discover the hottest job opportunities in 2025 and understand what skills employers are actively seeking.",
        "category": "job-market-salaries",
        "categoryName": "Job Market & Salaries",
        "image": "https://images.pexels.com/photos/7176132/pexels-photo-7176132.jpeg",
        "author": "Emma Rodriguez",
        "publishedAt": "2025-01-10",
        "readingTime": 9,
        "featured": True,
        "content": """<h2>The Evolving Employment Landscape</h2>
<p>The job market in 2025 reflects dramatic shifts in technology, demographics, and global priorities. Understanding which roles are most in-demand helps job seekers and career changers position themselves for success.</p>

<h2>Technology Sector Positions</h2>
<h3>Artificial Intelligence and Machine Learning Engineers</h3>
<p>AI specialists remain among the most sought-after professionals, with demand far exceeding supply. These roles involve developing algorithms that enable machines to learn and make decisions.</p>
<p><strong>Required Skills:</strong> Python, TensorFlow, PyTorch, statistical modeling, neural network architecture</p>
<p><strong>Salary Range:</strong> $120,000 - $250,000+ depending on experience and specialization</p>

<h3>Cybersecurity Specialists</h3>
<p>As cyber threats grow more sophisticated, organizations invest heavily in security professionals.</p>
<p><strong>Required Skills:</strong> Network security, threat detection, compliance frameworks, penetration testing</p>
<p><strong>Salary Range:</strong> $80,000 - $180,000+</p>

<h2>Healthcare Positions</h2>
<h3>Nurse Practitioners and Physician Assistants</h3>
<p>Healthcare systems facing physician shortages increasingly rely on advanced practice providers.</p>
<p><strong>Salary Range:</strong> $95,000 - $140,000</p>

<h3>Mental Health Professionals</h3>
<p>Growing awareness of mental health importance has created unprecedented demand for therapists and counselors.</p>
<p><strong>Salary Range:</strong> $50,000 - $200,000+ depending on specialty</p>

<h2>Skilled Trades</h2>
<h3>Electricians and Solar Technicians</h3>
<p>Clean energy transition creates strong demand for electrical professionals trained in renewable energy systems.</p>
<p><strong>Salary Range:</strong> $55,000 - $100,000+</p>

<h2>Positioning Yourself for Success</h2>
<ul>
<li><strong>Continuous Learning:</strong> Commit to ongoing skill development</li>
<li><strong>Digital Fluency:</strong> Develop comfort with technology</li>
<li><strong>Networking:</strong> Build professional relationships</li>
<li><strong>Adaptability:</strong> Demonstrate willingness to learn</li>
</ul>

<h2>Conclusion</h2>
<p>The most in-demand jobs of 2025 span traditional and emerging fields. Success comes from identifying roles that match your interests and strategically developing the skills employers need.</p>"""
    },
    {
        "id": "art-4",
        "slug": "how-to-choose-the-right-degree",
        "title": "How to Choose the Right Degree",
        "excerpt": "A comprehensive guide to selecting a degree program that aligns with your career goals and personal interests.",
        "category": "studies-degrees",
        "categoryName": "Studies & Degrees",
        "image": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxlZHVjYXRpb258ZW58MHx8fHwxNzY3MTI5MzM3fDA&ixlib=rb-4.1.0&q=85",
        "author": "David Park",
        "publishedAt": "2025-01-08",
        "readingTime": 11,
        "featured": False,
        "content": """<h2>The Importance of Choosing Wisely</h2>
<p>Selecting a degree program represents one of the most significant decisions you'll make in your educational journey. The right choice can open doors to fulfilling careers.</p>

<h2>Self-Assessment: Know Yourself First</h2>
<h3>Identify Your Interests</h3>
<p>What topics captivate your attention? What do you enjoy reading about, discussing, or exploring? Genuine interest sustains motivation through challenging coursework.</p>

<h3>Assess Your Strengths</h3>
<p>What comes naturally to you? Are you better with numbers or words? Understanding your natural abilities helps identify programs where you're likely to succeed.</p>

<h2>Research Career Outcomes</h2>
<h3>Employment Rates</h3>
<p>Research what percentage of graduates find employment within six months of graduation.</p>

<h3>Salary Expectations</h3>
<p>Understand the realistic salary range for careers your degree enables.</p>

<h2>Evaluate Program Quality</h2>
<p>Not all degrees are created equal. Consider accreditation, faculty credentials, and alumni success.</p>

<h2>Conclusion</h2>
<p>Choosing the right degree requires balancing self-knowledge, career research, program evaluation, and practical considerations. Take the time to explore thoroughly.</p>"""
    },
    {
        "id": "art-5",
        "slug": "career-change-after-30",
        "title": "Career Change After 30: What You Should Know",
        "excerpt": "Navigate mid-career transitions successfully with practical strategies and realistic expectations for changing fields.",
        "category": "career-change",
        "categoryName": "Career Change",
        "image": "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85",
        "author": "Jennifer Walsh",
        "publishedAt": "2025-01-05",
        "readingTime": 12,
        "featured": False,
        "content": """<h2>Redefining Career Success at Any Age</h2>
<p>The traditional career model—choosing a profession in your twenties and staying until retirement—is increasingly rare. Career changes at 30, 40, or even 50 are common.</p>

<h2>Why People Change Careers After 30</h2>
<h3>Seeking Greater Meaning</h3>
<p>Many professionals reach a point where financial stability alone doesn't satisfy. They seek work that aligns with their values.</p>

<h3>Burnout and Dissatisfaction</h3>
<p>Chronic stress or fundamental misalignment between your nature and your work can make change necessary.</p>

<h2>The Advantages of Changing Careers After 30</h2>
<h3>Life Experience</h3>
<p>Maturity, emotional intelligence, and diverse experiences provide perspective that younger professionals lack.</p>

<h3>Transferable Skills</h3>
<p>Years of work experience build capabilities—communication, project management, problem-solving—that apply across industries.</p>

<h2>Making the Transition Successfully</h2>
<ul>
<li><strong>Research Thoroughly:</strong> Deeply understand your target field</li>
<li><strong>Identify Skill Gaps:</strong> Create a plan for acquiring needed skills</li>
<li><strong>Build a Bridge:</strong> Look for roles that connect your current experience to your target field</li>
<li><strong>Leverage Your Network:</strong> Relationships can open doors</li>
</ul>

<h2>Conclusion</h2>
<p>Changing careers after 30 is not only possible—it can be the beginning of your most fulfilling professional chapter.</p>"""
    },
    {
        "id": "art-6",
        "slug": "skills-employers-looking-for",
        "title": "Skills Employers Are Looking For",
        "excerpt": "Learn which skills are most valued by employers across industries and how to develop them effectively.",
        "category": "skills-training",
        "categoryName": "Skills & Training",
        "image": "https://images.unsplash.com/photo-1553484771-371a605b060b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85",
        "author": "Robert Kim",
        "publishedAt": "2025-01-03",
        "readingTime": 10,
        "featured": False,
        "content": """<h2>The Skills That Set Candidates Apart</h2>
<p>Understanding what employers actually seek gives you a crucial advantage in competitive job markets.</p>

<h2>Technical Skills in High Demand</h2>
<h3>Digital Literacy</h3>
<p>Basic comfort with technology is now assumed for virtually all professional roles. Beyond basics, employers seek proficiency in data analysis tools and collaboration platforms.</p>

<h3>Data Analysis</h3>
<p>The ability to gather, analyze, and draw insights from data has become valuable across functions.</p>

<h2>Soft Skills That Make the Difference</h2>
<h3>Communication</h3>
<p>Clear written and verbal communication remains consistently among employers' top priorities.</p>

<h3>Critical Thinking and Problem Solving</h3>
<p>Employers value individuals who can analyze complex situations and develop creative solutions.</p>

<h3>Adaptability</h3>
<p>The ability to adjust to new circumstances and remain productive amid uncertainty is essential.</p>

<h2>How to Develop High-Value Skills</h2>
<ul>
<li><strong>Formal Education and Training:</strong> Courses, certifications, and degree programs</li>
<li><strong>On-the-Job Learning:</strong> Seek stretch assignments</li>
<li><strong>Self-Directed Learning:</strong> Books, podcasts, online tutorials</li>
<li><strong>Mentorship:</strong> Learn from those with relevant experience</li>
</ul>

<h2>Conclusion</h2>
<p>Focus your development on high-value skills that align with your career goals, and learn to demonstrate those skills effectively.</p>"""
    },
    {
        "id": "art-7",
        "slug": "how-much-do-different-jobs-pay",
        "title": "How Much Do Different Jobs Pay?",
        "excerpt": "Comprehensive salary guide across industries and experience levels to help you set realistic expectations.",
        "category": "job-market-salaries",
        "categoryName": "Job Market & Salaries",
        "image": "https://images.pexels.com/photos/8527750/pexels-photo-8527750.jpeg",
        "author": "Amanda Foster",
        "publishedAt": "2024-12-28",
        "readingTime": 11,
        "featured": False,
        "content": """<h2>Understanding Salary Realities</h2>
<p>Salary expectations significantly influence career decisions, yet many people lack accurate information about what different jobs actually pay.</p>

<h2>Factors That Influence Salary</h2>
<h3>Geographic Location</h3>
<p>Salaries vary dramatically by location. Major metropolitan areas typically offer higher pay.</p>

<h3>Experience Level</h3>
<p>Entry-level positions pay significantly less than mid-career and senior roles.</p>

<h2>Technology Industry Salaries</h2>
<h3>Software Development</h3>
<ul>
<li>Entry Level: $65,000 - $85,000</li>
<li>Mid-Career: $100,000 - $150,000</li>
<li>Senior/Lead: $150,000 - $250,000+</li>
</ul>

<h2>Healthcare Industry Salaries</h2>
<h3>Nursing</h3>
<ul>
<li>Registered Nurse: $65,000 - $95,000</li>
<li>Nurse Practitioner: $100,000 - $140,000</li>
</ul>

<h2>Skilled Trades Salaries</h2>
<h3>Electricians</h3>
<ul>
<li>Apprentice: $35,000 - $45,000</li>
<li>Journeyman: $55,000 - $80,000</li>
<li>Master/Contractor: $80,000 - $120,000+</li>
</ul>

<h2>Conclusion</h2>
<p>Salary varies significantly based on multiple factors. Research specific information for your situation rather than relying on generalizations.</p>"""
    },
    {
        "id": "art-8",
        "slug": "is-remote-work-still-worth-it",
        "title": "Is Remote Work Still Worth It?",
        "excerpt": "Evaluate the pros and cons of remote work in 2025 and determine if it aligns with your career goals.",
        "category": "career-paths",
        "categoryName": "Career Paths",
        "image": "https://images.unsplash.com/photo-1763718432504-7716caff6e99?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxjYXJlZXIlMjBndWlkYW5jZXxlbnwwfHx8fDE3NjcxMjkzMjV8MA&ixlib=rb-4.1.0&q=85",
        "author": "Thomas Gray",
        "publishedAt": "2024-12-25",
        "readingTime": 9,
        "featured": False,
        "content": """<h2>The Remote Work Evolution</h2>
<p>Remote work transformed from emergency necessity to widespread practice. But is it still worth pursuing in 2025?</p>

<h2>Benefits of Remote Work</h2>
<h3>Flexibility and Autonomy</h3>
<p>Remote work offers unparalleled control over your work environment and schedule.</p>

<h3>Elimination of Commute</h3>
<p>The average commute consumes significant time and money. Eliminating this returns hours to your day.</p>

<h2>Drawbacks of Remote Work</h2>
<h3>Isolation and Loneliness</h3>
<p>The lack of daily in-person interaction affects many remote workers negatively.</p>

<h3>Career Advancement Concerns</h3>
<p>Research suggests remote workers may face disadvantages in promotion and recognition.</p>

<h2>Is Remote Work Right for You?</h2>
<p>Consider your work style, social needs, career stage, and living situation.</p>

<h2>Conclusion</h2>
<p>Remote work remains valuable for many professionals, but it's not ideal for everyone. Honest self-assessment determines whether it serves you well.</p>"""
    },
    {
        "id": "art-9",
        "slug": "build-career-without-degree",
        "title": "How to Build a Career Without a Degree",
        "excerpt": "Discover proven strategies for building a successful career path without traditional higher education credentials.",
        "category": "studies-degrees",
        "categoryName": "Studies & Degrees",
        "image": "https://images.pexels.com/photos/7176132/pexels-photo-7176132.jpeg",
        "author": "Chris Martinez",
        "publishedAt": "2024-12-22",
        "readingTime": 10,
        "featured": False,
        "content": """<h2>Success Beyond Traditional Education</h2>
<p>The conventional wisdom that career success requires a college degree is increasingly challenged by real-world evidence.</p>

<h2>Why Degrees Are No Longer Mandatory</h2>
<h3>Skills-Based Hiring</h3>
<p>Major employers including Google, Apple, and IBM have removed degree requirements from numerous positions.</p>

<h3>Alternative Credentials</h3>
<p>Professional certifications, bootcamp certificates, and portfolio-based evidence of capability provide ways to demonstrate competence.</p>

<h2>Careers Accessible Without Degrees</h2>
<ul>
<li><strong>Technology:</strong> Software development, web design, IT support</li>
<li><strong>Skilled Trades:</strong> Electricians, plumbers, HVAC technicians</li>
<li><strong>Sales:</strong> Performance-based roles prioritize results over education</li>
<li><strong>Creative Fields:</strong> Writers, designers, photographers</li>
</ul>

<h2>Strategies for Success Without a Degree</h2>
<ul>
<li>Develop in-demand skills through online courses and certifications</li>
<li>Build a compelling portfolio</li>
<li>Gain practical experience through entry-level positions or freelancing</li>
<li>Network strategically</li>
</ul>

<h2>Conclusion</h2>
<p>Building a career without a degree is more achievable than ever, but it requires strategy, persistence, and continuous learning.</p>"""
    },
    {
        "id": "art-10",
        "slug": "common-career-orientation-mistakes",
        "title": "Common Career Orientation Mistakes",
        "excerpt": "Avoid these frequent career planning errors that can derail your professional journey and limit opportunities.",
        "category": "tips-advice",
        "categoryName": "Tips & Advice",
        "image": "https://images.unsplash.com/photo-1622675103136-e4b90c9a33d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85",
        "author": "Laura Bennett",
        "publishedAt": "2024-12-18",
        "readingTime": 8,
        "featured": False,
        "content": """<h2>Learning from Others' Missteps</h2>
<p>Career planning mistakes are surprisingly common. Understanding these pitfalls helps you navigate more effectively.</p>

<h2>Mistake #1: Following Passion Without Pragmatism</h2>
<p>The advice to "follow your passion" oversimplifies career decisions. Seek the intersection of interest, aptitude, and market demand.</p>

<h2>Mistake #2: Choosing Based Solely on Salary</h2>
<p>Selecting a career purely for financial rewards often leads to dissatisfaction.</p>

<h2>Mistake #3: Neglecting Research</h2>
<p>Many people make career decisions based on assumptions rather than thorough research.</p>

<h2>Mistake #4: Ignoring Soft Skills Development</h2>
<p>Soft skills often determine success more than technical skills alone.</p>

<h2>Mistake #5: Failing to Network</h2>
<p>Most job opportunities arise through relationships rather than applications.</p>

<h2>Conclusion</h2>
<p>Career orientation mistakes are common but avoidable. By understanding these pitfalls, you can navigate your professional journey with greater wisdom.</p>"""
    },
    {
        "id": "art-11",
        "slug": "how-to-find-job-faster",
        "title": "How to Find a Job Faster",
        "excerpt": "Proven strategies to accelerate your job search and land interviews more quickly in competitive markets.",
        "category": "career-change",
        "categoryName": "Career Change",
        "image": "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85",
        "author": "Jason Park",
        "publishedAt": "2024-12-15",
        "readingTime": 9,
        "featured": False,
        "content": """<h2>Accelerating Your Job Search</h2>
<p>Strategic approaches significantly reduce time-to-hire. These proven techniques help you find positions faster.</p>

<h2>Optimize Your Search Foundation</h2>
<h3>Define Your Target Clearly</h3>
<p>Vague searches produce vague results. Define specifically what roles you're seeking.</p>

<h3>Perfect Your Resume</h3>
<p>Ensure your resume highlights achievements with quantifiable results and contains keywords from target job descriptions.</p>

<h2>Expand Your Search Channels</h2>
<h3>Activate Your Network</h3>
<p>Most jobs are filled through referrals. Reach out to your professional network.</p>

<h3>Target Companies Directly</h3>
<p>Pursue companies proactively rather than only responding to posted jobs.</p>

<h2>Increase Your Application Effectiveness</h2>
<ul>
<li>Quality over quantity in applications</li>
<li>Apply early to postings</li>
<li>Follow application instructions exactly</li>
<li>Write compelling cover letters</li>
</ul>

<h2>Conclusion</h2>
<p>Finding a job faster requires strategic effort, not just more effort. Focus on targeted applications, active networking, and thorough preparation.</p>"""
    },
    {
        "id": "art-12",
        "slug": "education-paths-explained-simply",
        "title": "Education Paths Explained Simply",
        "excerpt": "A clear overview of different educational options from high school through advanced degrees and certifications.",
        "category": "skills-training",
        "categoryName": "Skills & Training",
        "image": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb258ZW58MHx8fHwxNzY3MTI5MzM3fDA&ixlib=rb-4.1.0&q=85",
        "author": "Rachel Green",
        "publishedAt": "2024-12-12",
        "readingTime": 8,
        "featured": False,
        "content": """<h2>Understanding Your Educational Options</h2>
<p>The education landscape offers numerous pathways, each suited to different goals and circumstances.</p>

<h2>Post-Secondary Options</h2>
<h3>Community College (2 Years)</h3>
<p>Offers associate degrees, certificates, and transfer pathways. Best for affordable education or exploring interests.</p>

<h3>Four-Year University</h3>
<p>Comprehensive education combining broad liberal arts with specialized major study. Typical duration: 4 years.</p>

<h3>Trade and Technical Schools</h3>
<p>Focused training for specific occupations. Typical duration: 6 months to 2 years.</p>

<h2>Graduate Education</h2>
<h3>Master's Degree</h3>
<p>Advanced specialization beyond bachelor's level. Duration: 1-3 years.</p>

<h3>Doctoral Degrees</h3>
<p>Highest academic credential. Duration: 3-8 years depending on field.</p>

<h2>Alternative Learning Options</h2>
<ul>
<li><strong>Bootcamps:</strong> Intensive, accelerated training (8-24 weeks)</li>
<li><strong>Online Learning Platforms:</strong> Flexible, affordable courses</li>
<li><strong>Professional Certifications:</strong> Verified competence in specific areas</li>
</ul>

<h2>Conclusion</h2>
<p>No single path is universally "best"—the right choice depends on your goals, circumstances, and preferences.</p>"""
    }
]


# ==================== DATABASE SEEDING ====================

async def seed_database():
    """Seed the database with initial data if empty"""
    try:
        # Check if categories exist
        cat_count = await db.categories.count_documents({})
        if cat_count == 0:
            logger.info("Seeding categories...")
            await db.categories.insert_many(SEED_CATEGORIES)
            logger.info(f"Seeded {len(SEED_CATEGORIES)} categories")
        
        # Check if articles exist
        art_count = await db.articles.count_documents({})
        if art_count == 0:
            logger.info("Seeding articles...")
            await db.articles.insert_many(SEED_ARTICLES)
            logger.info(f"Seeded {len(SEED_ARTICLES)} articles")
        
        # Create indexes
        await db.articles.create_index("slug", unique=True)
        await db.articles.create_index("category")
        await db.articles.create_index("featured")
        await db.categories.create_index("slug", unique=True)
        await db.newsletter_subscribers.create_index("email", unique=True)
        
        logger.info("Database seeding complete")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")


# ==================== API ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "CareerPath API - Education & Career Guidance"}


# ----- Categories -----

@api_router.get("/categories", response_model=List[CategoryResponse])
async def get_categories():
    """Get all categories"""
    categories = await db.categories.find({}, {"_id": 0}).to_list(100)
    return categories


@api_router.get("/categories/{slug}", response_model=CategoryResponse)
async def get_category(slug: str):
    """Get a single category by slug"""
    category = await db.categories.find_one({"slug": slug}, {"_id": 0})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


# ----- Articles -----

@api_router.get("/articles", response_model=List[ArticleListResponse])
async def get_articles(
    limit: int = Query(default=50, le=100),
    skip: int = Query(default=0, ge=0)
):
    """Get all articles with pagination"""
    articles = await db.articles.find(
        {}, 
        {"_id": 0, "content": 0}
    ).sort("publishedAt", -1).skip(skip).limit(limit).to_list(limit)
    return articles


@api_router.get("/articles/featured", response_model=List[ArticleListResponse])
async def get_featured_articles(limit: int = Query(default=3, le=10)):
    """Get featured articles"""
    articles = await db.articles.find(
        {"featured": True}, 
        {"_id": 0, "content": 0}
    ).sort("publishedAt", -1).limit(limit).to_list(limit)
    return articles


@api_router.get("/articles/search", response_model=List[ArticleListResponse])
async def search_articles(q: str = Query(..., min_length=1)):
    """Search articles by title or excerpt"""
    # Create case-insensitive regex pattern
    pattern = re.compile(re.escape(q), re.IGNORECASE)
    articles = await db.articles.find(
        {
            "$or": [
                {"title": {"$regex": pattern}},
                {"excerpt": {"$regex": pattern}}
            ]
        },
        {"_id": 0, "content": 0}
    ).sort("publishedAt", -1).to_list(50)
    return articles


@api_router.get("/articles/category/{category_slug}", response_model=List[ArticleListResponse])
async def get_articles_by_category(
    category_slug: str,
    exclude: Optional[str] = None,
    limit: int = Query(default=50, le=100)
):
    """Get articles by category"""
    query = {"category": category_slug}
    if exclude:
        query["slug"] = {"$ne": exclude}
    
    articles = await db.articles.find(
        query, 
        {"_id": 0, "content": 0}
    ).sort("publishedAt", -1).limit(limit).to_list(limit)
    return articles


@api_router.get("/articles/{slug}", response_model=ArticleResponse)
async def get_article(slug: str):
    """Get a single article by slug"""
    article = await db.articles.find_one({"slug": slug}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


# ----- Newsletter -----

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(data: NewsletterSubscribe):
    """Subscribe to newsletter"""
    try:
        # Check if already subscribed
        existing = await db.newsletter_subscribers.find_one({"email": data.email})
        if existing:
            if existing.get("active", True):
                return {"message": "Already subscribed", "success": True}
            else:
                # Reactivate subscription
                await db.newsletter_subscribers.update_one(
                    {"email": data.email},
                    {"$set": {"active": True, "subscribedAt": datetime.now(timezone.utc).isoformat()}}
                )
                return {"message": "Subscription reactivated", "success": True}
        
        # Create new subscriber
        subscriber = NewsletterSubscriber(
            email=data.email,
            name=data.name
        )
        await db.newsletter_subscribers.insert_one(subscriber.model_dump())
        return {"message": "Successfully subscribed", "success": True}
    except Exception as e:
        logger.error(f"Newsletter subscription error: {e}")
        raise HTTPException(status_code=500, detail="Failed to subscribe")


# ----- Contact -----

@api_router.post("/contact")
async def submit_contact(data: ContactForm):
    """Submit contact form"""
    try:
        message = ContactMessage(
            name=data.name,
            email=data.email,
            subject=data.subject,
            message=data.message
        )
        await db.contact_messages.insert_one(message.model_dump())
        return {"message": "Message sent successfully", "success": True}
    except Exception as e:
        logger.error(f"Contact form error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send message")


# ==================== APP SETUP ====================

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    """Run database seeding on startup"""
    await seed_database()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()