document.addEventListener('DOMContentLoaded', () => {
  // Create the main container
  const profileContainer = document.createElement('div');
  profileContainer.className = 'profile-container';
  document.body.appendChild(profileContainer);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f7fa;
      color: #333;
    }
    
    .profile-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      background-color: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .profile-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      border: 5px solid #4a90e2;
    }
    
    .profile-title {
      font-size: 2rem;
      margin: 0;
      color: #2c3e50;
    }
    
    .profile-subtitle {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin: 0;
    }
    
    .profile-social {
      display: flex;
      gap: 15px;
    }
    
    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #e8f4fc;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s;
    }
    
    .social-icon:hover {
      transform: scale(1.1);
    }
    
    .profile-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 20px;
    }
    
    .profile-details {
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .section-title {
      font-size: 1.4rem;
      color: #2c3e50;
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #ecf0f1;
    }
    
    .detail-item {
      margin-bottom: 15px;
    }
    
    .detail-label {
      font-weight: 600;
      color: #7f8c8d;
    }
    
    .detail-value {
      color: #2c3e50;
    }
    
    .profile-posts {
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .post {
      padding: 20px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    
    .post-title {
      font-size: 1.2rem;
      color: #2c3e50;
      margin: 0 0 10px;
    }
    
    .post-meta {
      display: flex;
      gap: 15px;
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    
    .post-content {
      line-height: 1.6;
    }
    
    .post-image {
      width: 100%;
      border-radius: 8px;
      margin: 15px 0;
    }
    
    @media (max-width: 768px) {
      .profile-content {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);

  // Profile Header
  const profileHeader = document.createElement('div');
  profileHeader.className = 'profile-header';
  profileContainer.appendChild(profileHeader);

  const avatar = document.createElement('img');
  avatar.className = 'profile-avatar';
  avatar.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8dee855a-c833-4d3e-a493-fad0182a4d78.png';
  avatar.alt = 'Profile photo of a professional web developer smiling, wearing a casual shirt with a blurred office background';
  profileHeader.appendChild(avatar);

  const title = document.createElement('h1');
  title.className = 'profile-title';
  title.textContent = 'Alex Johnson';
  profileHeader.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'profile-subtitle';
  subtitle.textContent = 'Senior Web Developer & UI Designer';
  profileHeader.appendChild(subtitle);

  const socialContainer = document.createElement('div');
  socialContainer.className = 'profile-social';
  profileHeader.appendChild(socialContainer);

  const socialLinks = [
    { icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b3f389f4-29c0-4b01-a666-491719d02b38.png', alt: 'Twitter logo icon' },
    { icon: 'https://placehold.co/24x24', alt: 'GitHub logo icon' },
    { icon: 'https://placehold.co/24x24', alt: 'LinkedIn logo icon' },
    { icon: 'https://placehold.co/24x24', alt: 'Dribbble logo icon' }
  ];

  socialLinks.forEach(link => {
    const icon = document.createElement('div');
    icon.className = 'social-icon';
    const iconImg = document.createElement('img');
    iconImg.src = link.icon;
    iconImg.alt = link.alt;
    icon.appendChild(iconImg);
    socialContainer.appendChild(icon);
  });

  // Profile Content
  const profileContent = document.createElement('div');
  profileContent.className = 'profile-content';
  profileContainer.appendChild(profileContent);

  // Details Section
  const detailsSection = document.createElement('div');
  detailsSection.className = 'profile-details';
  profileContent.appendChild(detailsSection);

  const detailsTitle = document.createElement('h2');
  detailsTitle.className = 'section-title';
  detailsTitle.textContent = 'About Me';
  detailsSection.appendChild(detailsTitle);

  const details = [
    { label: 'Location', value: 'San Francisco, CA' },
    { label: 'Email', value: 'alex.johnson@example.com' },
    { label: 'Phone', value: '(123) 456-7890' },
    { label: 'Experience', value: '8+ years' },
    { label: 'Skills', value: 'JavaScript, React, Node.js, UI/UX Design' }
  ];

  details.forEach(detail => {
    const item = document.createElement('div');
    item.className = 'detail-item';
    
    const label = document.createElement('div');
    label.className = 'detail-label';
    label.textContent = detail.label;
    item.appendChild(label);
    
    const value = document.createElement('div');
    value.className = 'detail-value';
    value.textContent = detail.value;
    item.appendChild(value);
    
    detailsSection.appendChild(item);
  });

  // Posts Section
  const postsSection = document.createElement('div');
  postsSection.className = 'profile-posts';
  profileContent.appendChild(postsSection);

  const postsTitle = document.createElement('h2');
  postsTitle.className = 'section-title';
  postsTitle.textContent = 'Recent Work';
  postsSection.appendChild(postsTitle);

  const posts = [
    {
      title: 'Building a Modern Web Application',
      date: 'October 15, 2023',
      category: 'Web Development',
      content: 'Recently completed a full-stack application using React and Node.js with a focus on performance optimization and accessibility standards.',
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/61c13e16-3e88-4daf-af2e-128a88220dd6.png',
      imageAlt: 'Screenshot of a modern web application dashboard with charts and analytics'
    },
    {
      title: 'UI Design Workshop',
      date: 'September 2, 2023',
      category: 'Design',
      content: 'Conducted a workshop on modern UI design principles with focus on creating intuitive user interfaces that prioritize user experience.',
      image: 'https://placehold.co/800x450',
      imageAlt: 'Workshop participants interacting with design software in a modern office space'
    }
  ];

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postsSection.appendChild(postElement);
    
    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = post.title;
    postElement.appendChild(title);
    
    const meta = document.createElement('div');
    meta.className = 'post-meta';
    meta.innerHTML = `<span>${post.date}</span> · <span>${post.category}</span>`;
    postElement.appendChild(meta);
    
    const content = document.createElement('div');
    content.className = 'post-content';
    content.textContent = post.content;
    postElement.appendChild(content);
    
    const image = document.createElement('img');
    image.className = 'post-image';
    image.src = post.image;
    image.alt = post.imageAlt;
    postElement.appendChild(image);
  });
});

