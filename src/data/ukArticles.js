// Curated sample articles written in British English. These replace lorem-ipsum
// demo posts from JSONPlaceholder, whose text is not meaningful editorial content.
export const ukArticles = [
  {
    id: 'uk-01', category: 'Engineering practice', readingTime: '3 min read',
    title: 'A practical guide to building reusable React components',
    body: 'Reusable components help teams keep interfaces consistent and easier to maintain. Start with a clear responsibility, expose only the props a component needs, and keep presentation separate from data fetching. Document important decisions and test keyboard interactions as well as mouse behaviour. A small, well-designed component is usually more useful than a highly configurable one that is difficult to understand.'
  },
  {
    id: 'uk-02', category: 'Project delivery', readingTime: '4 min read',
    title: 'How to keep a student software project on track',
    body: 'Break the project into small tasks with an owner, a clear outcome and a realistic due date. Keep the board up to date, raise blockers early and review progress at the end of each week. A short README, useful commit messages and a working demonstration make it easier for classmates and reviewers to understand what has changed.'
  },
  {
    id: 'uk-03', category: 'Accessibility', readingTime: '3 min read',
    title: 'Making web forms more accessible and reliable',
    body: 'Give every field a visible label, explain validation errors beside the relevant input and preserve entered information when a submission fails. Make sure the form can be completed with a keyboard and that focus is easy to see. Clear success messages should confirm what happened, while error messages should explain how to recover.'
  },
  {
    id: 'uk-04', category: 'Performance', readingTime: '4 min read',
    title: 'Small performance improvements that users can feel',
    body: 'Measure before making changes. Reduce unnecessary re-renders, load large sections only when needed and reserve space for images to prevent layout shifts. Use loading skeletons when they help people understand the shape of incoming content, and provide a retry action when a request fails. Smooth transitions should support the task rather than delay it.'
  },
  {
    id: 'uk-05', category: 'Team collaboration', readingTime: '3 min read',
    title: 'Writing useful pull request descriptions',
    body: 'A helpful pull request explains the problem, summarises the approach and lists the checks that were completed. Include screenshots for visual changes and note any risks or follow-up work. Keep each change focused so reviewers can understand it quickly. Respectful, specific feedback helps a team improve the code without making collaboration personal.'
  },
  {
    id: 'uk-06', category: 'Security', readingTime: '4 min read',
    title: 'Why front-end role checks are not enough for security',
    body: 'Hiding an administrative button improves the interface, but it does not protect the underlying data. A production service must verify identity and permissions on the server for every protected operation. Never store plain-text passwords or treat browser storage as a trusted source of authority. Mock authentication is useful for a prototype, but it must be clearly labelled as a demonstration.'
  },
  {
    id: 'uk-07', category: 'Learning', readingTime: '3 min read',
    title: 'Building a sustainable daily coding habit',
    body: 'Choose a small, measurable goal that fits your schedule, such as solving one problem or improving one feature. Record what you completed and what you learnt, not just the number of hours spent. Review the week, adjust the next target and allow time for rest. Consistency and reflection are more sustainable than trying to make every session perfect.'
  },
  {
    id: 'uk-08', category: 'Git and workflow', readingTime: '3 min read',
    title: 'Commit messages that help your future self',
    body: 'A good commit message describes one meaningful change in plain language. Keep commits focused, use consistent prefixes where a team has agreed on them, and avoid messages such as “final update” or “fixed things”. A clear history makes debugging, code review and handovers easier, particularly when several developers are working on the same feature.'
  },
  {
    id: 'uk-09', category: 'Testing', readingTime: '4 min read',
    title: 'Plan error states before the API fails',
    body: 'Network requests can be slow, unsuccessful or return unexpected data. Design loading, empty, error and success states alongside the happy path. Offer a retry option where it is safe, avoid losing the user’s work and keep the surrounding layout stable. These details make a product feel dependable even when a service is temporarily unavailable.'
  },
  {
    id: 'uk-10', category: 'Career development', readingTime: '3 min read',
    title: 'Turning project work into a portfolio story',
    body: 'A strong project write-up explains the problem, your contribution, the decisions you made and the result. Link to a repository or live demonstration when it is safe to share, and be honest about unfinished work. A concise explanation of a real challenge often tells a reviewer more than a long list of technologies.'
  }
]
