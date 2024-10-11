# Flix Spot

Flix Spot is a Netflix clone app designed to replicate the UI and smooth animations of Netflix. This project allowed me to focus on TypeScript and animation techniques to create a seamless user experience.

## Table of Contents
- [Motivation](#motivation)
- [Challenges I Faced](#challenges-i-faced)
  - [Slider Animation](#slider-animation)
  - [Modal for Video Details](#modal-for-video-details)
  - [Mobile Responsiveness and Zoom Issues](#mobile-responsiveness-and-zoom-issues)
- [What I Learned](#what-i-learned)
- [Tech Stack & Tools](#tech-stack--tools)
- [Key Features](#key-features)
- [Portfolio & GitHub Page](#portfolio--github-page)
- 
## Motivation

I wanted to enhance my skills in TypeScript and animation, so I chose to build a Netflix clone. Netflix’s animations are smooth and visually appealing, and I wanted to challenge myself to implement similar animations in my project.

## Challenges I Faced

### Slider Animation

Implementing the slider animation was one of the most challenging parts of this project. The first version had too many bugs, so I had to rebuild it from scratch. I wanted to make it responsive, which meant dynamically adjusting the size of the video boxes based on the screen size and the number of boxes displayed per row. Calculating the correct position for the previous and next slides to ensure smooth transitions was particularly complex.

To solve this, I managed the number of displayed videos in state and recalculated the box size on every screen resize. I subtracted the left and right padding and the gap between video boxes from the total screen width, then divided by the number of displayed boxes to determine the correct size. 

### Modal for Video Details

One challenge I faced was handling the modal pop-up for video details, as the API provided different structures for movies and TV shows. For example, to display the title in the modal, the movie data used `video.title`, while the TV show data used `video.name`. Instead of creating separate components for movies and TV shows, I used a simple conditional check. By using `||`, I ensured that if the first field (`video.title`) existed, it would be used; otherwise, the second field (`video.name`) would be used. This allowed me to handle both data types seamlessly without duplicating components.

### Mobile Responsiveness and Zoom Issues

On mobile devices, I noticed that users often zoom in and out, which was detected as a resize event. This caused issues with the video box sizes, as the slider recalculated the box dimensions each time. To fix this, I created a utility function to detect mobile devices and prevent resizing on zoom. I created a separate box size specifically for mobile devices and ensured that the number of displayed boxes remained fixed. On resize, if the device was detected as mobile, the function would immediately return without recalculating the box size or number of boxes, preventing any changes in the layout for mobile users.

Additionally, I prevented unnecessary scrolling outside of the required elements, like touch or keyboard arrow key scrolling, and disabled zooming out below 100%, which helped maintain the layout and hide unwanted elements.

## What I Learned

During this project, I learned:
- How to make efficient API calls using **React Query** for fetching external data.
- Implementing complex animations with **Framer Motion**.
- Deploying the project via **GitHub Pages**.
- Dynamically updating meta titles with **react-helmet** for better SEO.

## Tech Stack & Tools

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/) [![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://react-query.tanstack.com/) [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/) [![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)](https://recoiljs.org/) [![Styled Components](https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/) [![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/) [![React Helmet](https://img.shields.io/badge/React%20Helmet-006400?style=for-the-badge)](https://github.com/nfl/react-helmet)

## Key Features

- **Main Header**: Navigation between Home, Movie, and TV Show pages. On smaller screens, it switches to a dropdown menu.
- **Search Bar**: Clicking the search icon triggers an animation that reveals the search bar. It instantly requests new data as input changes, and redirects to the previous page if the input is cleared.
- **Homepage**: Hovering over movie images enlarges them with additional information. An X-axis scroll animation for the slider is implemented, and clicking on a movie box leads to the detail page.
- **Movie/TV Show Pages**: Includes a sub-header with dropdown genre navigation. Selecting a genre navigates to the appropriate page.
- **Search Page**: A search page with a loader animation, infinite scroll for data requests, and a secondary loader when scrolling.

## Portfolio & GitHub Page

You can view this project as part of my portfolio and access the GitHub repository through [this link](https://qwery1237.github.io/portfolio/).
