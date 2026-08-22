export const SQL_QUIZ_QUESTIONS = [
  {
    id: 1,
    topic: "Filtering & WHERE vs HAVING",
    question: "You want to find departments where the average employee salary exceeds $75,000, but only consider active employees (status = 'active'). Which SQL query is correct?",
    code: null,
    options: [
      "SELECT department, AVG(salary) FROM employees WHERE status = 'active' GROUP BY department HAVING AVG(salary) > 75000;",
      "SELECT department, AVG(salary) FROM employees WHERE AVG(salary) > 75000 GROUP BY department HAVING status = 'active';",
      "SELECT department, AVG(salary) FROM employees GROUP BY department WHERE status = 'active' AND AVG(salary) > 75000;",
      "SELECT department, AVG(salary) FROM employees HAVING status = 'active' AND AVG(salary) > 75000;"
    ],
    correctAnswer: 0,
    explanation: "WHERE filters individual rows BEFORE aggregation (status = 'active'), while HAVING filters aggregated results AFTER GROUP BY (AVG(salary) > 75000)."
  },
  {
    id: 2,
    topic: "Table JOINs",
    question: "Which JOIN type returns ALL records from the left table and matched records from the right table, filling with NULL if no match exists?",
    code: `SELECT c.customer_name, o.order_date\nFROM customers c\n_____ orders o ON c.customer_id = o.customer_id;`,
    options: [
      "INNER JOIN",
      "LEFT JOIN (or LEFT OUTER JOIN)",
      "CROSS JOIN",
      "FULL OUTER JOIN"
    ],
    correctAnswer: 1,
    explanation: "LEFT JOIN guarantees all records from the left table are returned, pairing them with matching right-table rows or NULLs."
  },
  {
    id: 3,
    topic: "Aggregations & Grouping",
    question: "What is the result of running COUNT(column_name) on a column that contains 5 total rows where 2 rows have NULL values?",
    code: null,
    options: [
      "5 (it counts all rows regardless of NULLs)",
      "3 (it ignores NULL values in the specified column)",
      "NULL (it errors on encountering NULL)",
      "2 (it counts only the NULL rows)"
    ],
    correctAnswer: 1,
    explanation: "COUNT(column_name) counts only non-null occurrences. In contrast, COUNT(*) counts all rows including NULLs."
  },
  {
    id: 4,
    topic: "Window Functions",
    question: "What does the SQL window function `ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC)` do?",
    code: null,
    options: [
      "Sums the salaries inside each department",
      "Assigns a sequential 1-based rank to employees within their department, ordered by salary highest to lowest",
      "Filters out duplicate salary rows in the department",
      "Calculates the running average salary"
    ],
    correctAnswer: 1,
    explanation: "PARTITION BY divides the dataset into department groups, and ROW_NUMBER() sequentially ranks each employee from 1 to N based on salary descending."
  }
];

export const AI_TUTOR_LESSONS = {
  title: "Module 2: Master SQL Fundamentals",
  topic: "Relational Queries, JOINs & Aggregations",
  estimatedTime: "2 hours · Intermediate",
  overview: "SQL (Structured Query Language) is the most critical missing competency for your Data Analyst target profile. In this interactive lesson, you will master the exact syntax, query execution order, and filtering strategies tested in interviews and real workflows.",
  keyConcepts: [
    {
      title: "Query Execution Order",
      desc: "SQL does NOT execute top-to-bottom. The database evaluates FROM/JOIN first, then WHERE, then GROUP BY, followed by HAVING, SELECT, and finally ORDER BY / LIMIT."
    },
    {
      title: "WHERE vs HAVING Rule",
      desc: "Use WHERE for row-level conditions before grouping. Use HAVING only for aggregate expressions (SUM, AVG, COUNT) after grouping."
    },
    {
      title: "Multi-Table JOIN Strategies",
      desc: "Always index foreign keys and specify explicit ON conditions to prevent accidental Cartesian cross-joins."
    }
  ],
  sampleQueries: [
    {
      name: "Top Revenue Customers Query",
      query: `SELECT \n  c.customer_name,\n  c.country,\n  COUNT(o.order_id) AS total_orders,\n  SUM(o.amount) AS total_spent\nFROM customers c\nINNER JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'completed'\nGROUP BY c.customer_name, c.country\nHAVING SUM(o.amount) >= 5000\nORDER BY total_spent DESC\nLIMIT 10;`
    }
  ]
};
