# Content Sections

<cite>
**Referenced Files in This Document**
- [data.js](file://lib/data.js)
- [AboutSection.jsx](file://components/sections/AboutSection.jsx)
- [ProjectsSection.jsx](file://components/sections/ProjectsSection.jsx)
- [SkillsSection.jsx](file://components/sections/SkillsSection.jsx)
- [ExperienceSection.jsx](file://components/sections/ExperienceSection.jsx)
- [EducationSection.jsx](file://components/sections/EducationSection.jsx)
- [ContactSection.jsx](file://components/sections/ContactSection.jsx)
- [StoryContent.jsx](file://components/StoryContent.jsx)
- [ScrollStory.jsx](file://components/ScrollStory.jsx)
- [page.js](file://app/page.js)
- [layout.js](file://app/layout.js)
</cite>

## Update Summary
**Changes Made**
- Updated all section components to use centralized data layer from lib/data.js
- Enhanced rendering logic with improved interactive elements and animations
- Streamlined data binding patterns across all content sections
- Improved component architecture with consistent data import patterns

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document explains how the portfolio's content sections are structured, styled, and bound to a centralized data layer. The portfolio now uses a unified data management approach where all content sections import data from lib/data.js, providing a single source of truth for profile information, education history, work experience, project details, skills categorization, and contact information. Each section component (About, Projects, Skills, Experience, Education, Contact) follows consistent patterns for layout, data binding, styling strategies, and customization options.

## Project Structure
The portfolio is a Next.js application using client components for interactive panels. The main page renders a loading screen and then a scroll-driven story that overlays content panels on top of a 3D workspace. Each content panel is a dedicated React component under components/sections that imports data from lib/data.js, ensuring centralized data management throughout the application.

```mermaid
graph TB
A["app/page.js"] --> B["components/ScrollStory.jsx"]
B --> C["components/StoryContent.jsx"]
C --> D["components/sections/AboutSection.jsx"]
C --> E["components/sections/ProjectsSection.jsx"]
C --> F["components/sections/SkillsSection.jsx"]
C --> G["components/sections/ExperienceSection.jsx"]
C --> H["components/sections/EducationSection.jsx"]
C --> I["components/sections/ContactSection.jsx"]
D -.-> J["lib/data.js"]
E -.-> J
F -.-> J
G -.-> J
H -.-> J
I -.-> J
J --> K["Centralized Data Layer"]
```

**Diagram sources**
- [page.js:1-66](file://app/page.js#L1-L66)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)
- [AboutSection.jsx:1-30](file://components/sections/AboutSection.jsx#L1-L30)
- [ProjectsSection.jsx:1-43](file://components/sections/ProjectsSection.jsx#L1-L43)
- [SkillsSection.jsx:1-42](file://components/sections/SkillsSection.jsx#L1-L42)
- [ExperienceSection.jsx:1-36](file://components/sections/ExperienceSection.jsx#L1-L36)
- [EducationSection.jsx:1-42](file://components/sections/EducationSection.jsx#L1-L42)
- [ContactSection.jsx:1-62](file://components/sections/ContactSection.jsx#L1-L62)
- [data.js:1-181](file://lib/data.js#L1-L181)

**Section sources**
- [page.js:1-66](file://app/page.js#L1-L66)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)

## Core Components
All section components now follow a consistent pattern of importing data from the centralized lib/data.js module:

- **AboutSection**: Displays personal introduction text and role labels sourced from profile
- **ProjectsSection**: Renders a grid of project cards linking to dynamic pages by project id
- **SkillsSection**: Shows technical skills with color-coded indicators and soft skills tags
- **ExperienceSection**: Presents work experience as a timeline with highlights
- **EducationSection**: Lists education entries with optional level and focus areas
- **ContactSection**: Provides contact actions (email, LinkedIn, GitHub, résumé)

Each component imports its specific data type (profile, projects, skills, experience, education) from lib/data.js and renders via Tailwind CSS classes with enhanced interactive elements.

**Section sources**
- [AboutSection.jsx:1-30](file://components/sections/AboutSection.jsx#L1-L30)
- [ProjectsSection.jsx:1-43](file://components/sections/ProjectsSection.jsx#L1-L43)
- [SkillsSection.jsx:1-42](file://components/sections/SkillsSection.jsx#L1-L42)
- [ExperienceSection.jsx:1-36](file://components/sections/ExperienceSection.jsx#L1-L36)
- [EducationSection.jsx:1-42](file://components/sections/EducationSection.jsx#L1-L42)
- [ContactSection.jsx:1-62](file://components/sections/ContactSection.jsx#L1-L62)
- [data.js:1-181](file://lib/data.js#L1-L181)

## Architecture Overview
The application uses a layered architecture with centralized data management:

- **Data Layer**: lib/data.js exports profile, education, experience, projects, and skills as modular exports
- **Presentation Layer**: Section components consume specific data types and render UI with enhanced interactivity
- **Orchestration Layer**: StoryContent orchestrates panel rendering and GSAP ScrollTrigger animations; ScrollStory composes the intro, content overlay, and 3D workspace

```mermaid
sequenceDiagram
participant User as "User"
participant Page as "app/page.js"
participant Scroll as "components/ScrollStory.jsx"
participant Story as "components/StoryContent.jsx"
participant Panel as "Section Components"
participant Data as "lib/data.js"
User->>Page : Open portfolio
Page-->>Scroll : Render ScrollStory after load
Scroll->>Story : Provide storyRef for scroll triggers
Story->>Panel : Map PANELS and render each section
Panel->>Data : Import specific data types (profile/projects/skills/etc.)
Data-->>Panel : Return structured content
Panel-->>User : Render UI with enhanced interactive elements
Note over Scroll,Story : GSAP ScrollTrigger animates panels on scroll
```

**Diagram sources**
- [page.js:1-66](file://app/page.js#L1-L66)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)
- [data.js:1-181](file://lib/data.js#L1-L181)

## Detailed Component Analysis

### AboutSection
**Updated** Now imports profile data directly from lib/data.js for centralized management

- **Layout**: Uses a panel wrapper with label, title, body text, role tags, and a quote area
- **Data Binding**: Reads profile.about and profile.labels from centralized lib/data.js
- **Styling**: Tailwind utility classes define typography, spacing, and tag styling
- **Customization**: Update profile.about or profile.labels in lib/data.js to change content. Add new fields to profile and reference them in JSX if needed

**Section sources**
- [AboutSection.jsx:1-30](file://components/sections/AboutSection.jsx#L1-L30)
- [data.js:1-15](file://lib/data.js#L1-L15)

### ProjectsSection
**Updated** Enhanced with improved rendering logic and better project card interactions

- **Layout**: Grid of project cards with icon, title, subtitle, stack, and link
- **Data Binding**: Iterates projects array from centralized lib/data.js; links to /project/[slug] using project.id
- **Styling**: Tailwind classes for card layout, hover effects, and typography with enhanced visual feedback
- **Customization**: Add new projects to lib/data.js with required fields (id, title, subtitle, stack, description, features, link). Ensure unique ids for routing

**Section sources**
- [ProjectsSection.jsx:1-43](file://components/sections/ProjectsSection.jsx#L1-L43)
- [data.js:91-137](file://lib/data.js#L91-L137)

### SkillsSection
**Updated** Improved skill display with enhanced interactive elements and better color management

- **Layout**: Technical skills displayed as colored dots with names; soft skills shown as tags
- **Data Binding**: Reads skills.technical (array of objects with name and color) and skills.soft (array of strings) from centralized lib/data.js
- **Styling**: Inline CSS variables set bloom colors per skill; Tailwind classes style tags and containers with enhanced visual effects
- **Customization**: Add new technical skills with a hex color; add soft skills to the array. Optionally extend skills object with new categories and render them in the component

**Section sources**
- [SkillsSection.jsx:1-42](file://components/sections/SkillsSection.jsx#L1-L42)
- [data.js:139-180](file://lib/data.js#L139-L180)

### ExperienceSection
**Updated** Enhanced timeline display with improved card interactions and better highlight presentation

- **Layout**: Timeline-style cards with numbered badges, role, company, period, location, and highlights list
- **Data Binding**: Maps experience array from centralized lib/data.js; displays first three highlights per entry
- **Styling**: Tailwind classes for timeline structure and typography with enhanced visual hierarchy
- **Customization**: Add new experience entries with id, role, company, period, location, and highlights. Adjust slice(0,3) if you want more highlights visible

**Section sources**
- [ExperienceSection.jsx:1-36](file://components/sections/ExperienceSection.jsx#L1-L36)
- [data.js:44-89](file://lib/data.js#L44-L89)

### EducationSection
**Updated** Improved education card layout with better badge handling and enhanced focus tag display

- **Layout**: Cards with badge, degree, institution, period/location, optional level, and optional focus tags
- **Data Binding**: Reads education array from centralized lib/data.js; conditionally renders level and focus fields
- **Styling**: Tailwind classes for card layout and tag styling with enhanced visual presentation
- **Customization**: Add new education entries with id, degree, institution, period, location; optionally include level and focus arrays

**Section sources**
- [EducationSection.jsx:1-42](file://components/sections/EducationSection.jsx#L1-L42)
- [data.js:17-42](file://lib/data.js#L17-L42)

### ContactSection
**Updated** Enhanced contact actions with improved button interactions and better link handling

- **Layout**: Title, message, action buttons (email, LinkedIn, GitHub, résumé), and closing quote
- **Data Binding**: Uses profile.email, profile.linkedin, profile.github for links from centralized lib/data.js
- **Styling**: Tailwind classes for button groups and typography with enhanced interactive states
- **Customization**: Update profile contact fields in lib/data.js; add new buttons by referencing additional profile properties

**Section sources**
- [ContactSection.jsx:1-62](file://components/sections/ContactSection.jsx#L1-L62)
- [data.js:1-15](file://lib/data.js#L1-L15)

### StoryContent and ScrollStory Orchestration
**Updated** Enhanced animation system with improved panel transitions and better scroll-triggered interactions

- **StoryContent** defines PANELS mapping each section to its animation start/end points and renders them within a container. GSAP ScrollTrigger drives fade-in/out and vertical transitions based on scroll position with enhanced performance
- **ScrollStory** composes the intro header, StoryContent overlay, and ThreeWorkspace background, providing a unified scroll context with improved animation timing

```mermaid
flowchart TD
Start(["Scroll begins"]) --> Intro["Intro fades out"]
Intro --> PanelA["About panel animates in"]
PanelA --> PanelB["Projects panel animates in"]
PanelB --> PanelC["Skills panel animates in"]
PanelC --> PanelD["Experience panel animates in"]
PanelD --> PanelE["Education panel animates in"]
PanelE --> PanelF["Contact panel animates in"]
PanelF --> End(["Scroll ends"])
```

**Diagram sources**
- [StoryContent.jsx:17-24](file://components/StoryContent.jsx#L17-L24)
- [StoryContent.jsx:30-75](file://components/StoryContent.jsx#L30-L75)
- [ScrollStory.jsx:17-34](file://components/ScrollStory.jsx#L17-L34)

**Section sources**
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)

## Dependency Analysis
**Updated** All dependencies now flow through the centralized data layer for improved maintainability

- **Data dependency**: All section components depend exclusively on lib/data.js for content, ensuring consistency and reducing duplication
- **UI orchestration**: StoryContent depends on GSAP and ScrollTrigger to animate panels; ScrollStory provides the scroll context and integrates 3D background
- **Routing**: ProjectsSection links to app/project/[slug] using project.id with enhanced navigation handling

```mermaid
graph LR
Data["lib/data.js"] --> About["AboutSection.jsx"]
Data --> Projects["ProjectsSection.jsx"]
Data --> Skills["SkillsSection.jsx"]
Data --> Experience["ExperienceSection.jsx"]
Data --> Education["EducationSection.jsx"]
Data --> Contact["ContactSection.jsx"]
Story["StoryContent.jsx"] --> About
Story --> Projects
Story --> Skills
Story --> Experience
Story --> Education
Story --> Contact
Scroll["ScrollStory.jsx"] --> Story
```

**Diagram sources**
- [data.js:1-181](file://lib/data.js#L1-L181)
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)

**Section sources**
- [data.js:1-181](file://lib/data.js#L1-L181)
- [StoryContent.jsx:1-91](file://components/StoryContent.jsx#L1-L91)
- [ScrollStory.jsx:1-70](file://components/ScrollStory.jsx#L1-L70)

## Performance Considerations
**Updated** Enhanced performance with centralized data management and improved rendering optimization

- **Client-side rendering**: All sections use "use client", enabling interactivity but requiring hydration. Centralized data reduces bundle size and improves initial load times
- **Animation performance**: GSAP ScrollTrigger animations are scoped to the story container; enhanced panel structures minimize DOM reflows
- **Image/media assets**: If adding images or 3D models, lazy-load or optimize assets to reduce initial bundle size
- **Routing**: Dynamic routes for projects should be pre-rendered or generated efficiently to avoid runtime overhead
- **Data caching**: Centralized data layer enables better caching strategies and reduces redundant data fetching

## Troubleshooting Guide
**Updated** Enhanced troubleshooting for centralized data management issues

- **Missing data fields**: If a section expects a field not present in lib/data.js, it may render undefined values. Validate data shapes before updating the centralized data layer
- **Duplicate project ids**: ProjectsSection uses project.id for routing; duplicates will cause navigation conflicts. Ensure unique ids in the centralized data
- **Animation glitches**: If panels do not animate, verify that StoryContent receives a valid storyRef and that GSAP plugins are registered
- **Link targets**: ContactSection relies on profile.contact fields; ensure they are non-empty to avoid broken links
- **Data synchronization**: Changes to lib/data.js automatically propagate to all sections due to centralized management

**Section sources**
- [ProjectsSection.jsx:18-38](file://components/sections/ProjectsSection.jsx#L18-L38)
- [ContactSection.jsx:19-52](file://components/sections/ContactSection.jsx#L19-L52)
- [StoryContent.jsx:30-75](file://components/StoryContent.jsx#L30-L75)

## Conclusion
The portfolio's content sections now benefit from a centralized data management approach that simplifies updates and extensions. All sections import data from lib/data.js, creating a single source of truth that enhances maintainability and consistency. This design makes it easier to modify content, adjust styles via Tailwind classes, and extend functionality by adding new fields and corresponding UI logic. The orchestration layer ensures smooth, scroll-driven interactions while keeping presentation and data concerns cleanly separated.

## Appendices

### Centralized Data Model Reference
**Updated** Enhanced data model with improved structure and additional fields

- **Profile**: name, tagline, labels, email, phone, whatsapp, linkedin, github, location, dateOfBirth, nationality, about
- **Education**: array of objects with id, degree, institution, period, location, optional level and focus
- **Experience**: array of objects with id, role, company, period, location, highlights
- **Projects**: array of objects with id, title, subtitle, stack, description, features, link
- **Skills**: object with technical (array of {name, color}), soft (array of strings), tools (array of strings)

**Section sources**
- [data.js:1-181](file://lib/data.js#L1-L181)

### Examples: Adding New Content

**Updated** Enhanced examples for working with centralized data management

- **Add a new project**
  - Update lib/data.js by appending an object to projects with required fields (id, title, subtitle, stack, description, features, link)
  - Ensure id is unique to support routing to /project/[slug]
  - ProjectsSection will automatically render the new card with enhanced interactions

  **Section sources**
  - [data.js:91-137](file://lib/data.js#L91-L137)
  - [ProjectsSection.jsx:17-38](file://components/sections/ProjectsSection.jsx#L17-L38)

- **Modify existing section content**
  - Edit the relevant export in lib/data.js (e.g., profile.about, experience[], education[])
  - No changes to components are required unless you introduce new fields
  - Changes automatically propagate to all sections due to centralized data management

  **Section sources**
  - [data.js:1-181](file://lib/data.js#L1-L181)

- **Extend the data model to support additional portfolio elements**
  - Example: Add a "Certifications" section
    - Define a certifications array in lib/data.js with fields like id, title, issuer, date, and optional link
    - Create a new CertificationsSection component that maps over certifications and renders cards
    - Register the new component in StoryContent's PANELS array with appropriate start/end percentages for animation
    - Style using Tailwind classes consistent with other panels

  **Section sources**
  - [data.js:1-181](file://lib/data.js#L1-L181)
  - [StoryContent.jsx:17-24](file://components/StoryContent.jsx#L17-L24)

### Styling Approach
**Updated** Enhanced styling approach with better integration of centralized data

- All sections use Tailwind CSS utility classes for layout, typography, and visual effects
- Some components use inline CSS variables (e.g., --bloom-color) to dynamically style elements based on data
- To customize appearance, modify class names or add new utilities in your global stylesheet referenced by layout.js
- Centralized data enables consistent styling patterns across all sections

**Section sources**
- [SkillsSection.jsx:16-26](file://components/sections/SkillsSection.jsx#L16-L26)
- [layout.js:1-55](file://app/layout.js#L1-L55)