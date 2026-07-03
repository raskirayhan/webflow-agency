const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: 'Commerce Flow',
    description: 'A high-converting e-commerce experience built with React, Node, and Stripe.',
    tech: ['React', 'Express', 'MongoDB'],
    github: 'https://github.com/raskirayhan/commerce-flow',
    demo: 'https://raskirayhan.github.io/commerce-flow',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #4f46e5, #38bdf8)'
  },
  {
    id: 2,
    title: 'Insight Dashboard',
    description: 'A sleek analytics platform focused on clarity, speed, and modern UI.',
    tech: ['Next.js', 'Firebase', 'Tailwind'],
    github: 'https://github.com/raskirayhan/insight-dashboard',
    demo: 'https://raskirayhan.github.io/insight-dashboard',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #14b8a6, #3b82f6)'
  },
  {
    id: 3,
    title: 'Pulse API Suite',
    description: 'A modular backend system for automation, integrations, and data pipelines.',
    tech: ['Node.js', 'API', 'MongoDB'],
    github: 'https://github.com/raskirayhan/pulse-api-suite',
    demo: 'https://raskirayhan.github.io/pulse-api-suite',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #f59e0b, #ec4899)'
  }
];

app.get('/api/projects', (req, res) => {
  res.json({ projects });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is live.' });
});

app.listen(port, () => {
  console.log(`Portfolio backend running at http://localhost:${port}`);
});
