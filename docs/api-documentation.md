# API Documentation - Excel Mock Interviewer

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication
Currently, no authentication is required for the public endpoints. Future versions may include API key authentication for enterprise features.

## Rate Limiting
- **General Endpoints**: 100 requests per minute per IP
- **AI-powered Endpoints**: 10 requests per minute per IP
- **Report Generation**: 5 requests per minute per IP

## Error Handling

All API responses follow a consistent error format:

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": "Additional error details (optional)"
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (Invalid input)
- `404` - Not Found (Resource doesn't exist)
- `429` - Too Many Requests (Rate limit exceeded)
- `500` - Internal Server Error

---

## Endpoints

### 1. Health Check

**GET** `/api/health`

Check the API service health status.

#### Response
```json
{
  "status": "healthy",
  "timestamp": "2025-07-25T10:30:00.000Z",
  "service": "Excel Mock Interviewer API"
}
```

---

### 2. Start Interview

**POST** `/api/interview/start`

Initialize a new interview session with candidate information.

#### Request Body
```json
{
  "candidateName": "John Doe",
  "candidateEmail": "john.doe@example.com"
}
```

#### Request Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `candidateName` | string | No | Candidate's full name |
| `candidateEmail` | string | No | Candidate's email address |

#### Response
```json
{
  "interviewId": "clr123abc456def789",
  "question": {
    "id": "clr123question456",
    "text": "How do you select all data in a worksheet quickly?",
    "category": "BASIC_OPERATIONS",
    "difficulty": "BEGINNER",
    "order": 1
  },
  "message": "Welcome to the Excel Mock Interview! I'm your AI interviewer, and I'll be assessing your Excel skills today. Let's begin with the first question."
}
```

#### Response Schema
| Field | Type | Description |
|-------|------|-------------|
| `interviewId` | string | Unique interview session identifier |
| `question` | object | First interview question |
| `question.id` | string | Question identifier |
| `question.text` | string | Question content |
| `question.category` | string | Excel skill category |
| `question.difficulty` | string | Question difficulty level |
| `question.order` | number | Question sequence number |
| `message` | string | AI interviewer welcome message |

#### Error Responses
- `500` - Failed to start interview (AI service unavailable)

---

### 3. Submit Answer

**POST** `/api/interview/answer`

Submit an answer to the current question and receive evaluation feedback.

#### Request Body
```json
{
  "interviewId": "clr123abc456def789",
  "questionId": "clr123question456",
  "answerText": "You can select all data by pressing Ctrl+A or clicking the intersection of row and column headers."
}
```

#### Request Schema
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `interviewId` | string | Yes | Interview session identifier |
| `questionId` | string | Yes | Current question identifier |
| `answerText` | string | Yes | Candidate's answer text |

#### Response (Continuing Interview)
```json
{
  "isComplete": false,
  "evaluation": {
    "score": 8.5,
    "feedback": "Excellent answer! You correctly identified both keyboard shortcut and mouse method. You demonstrated good knowledge of Excel basics."
  },
  "nextQuestion": {
    "id": "clr123question789",
    "text": "Explain how to create a dynamic pivot table",
    "category": "PIVOT_TABLES",
    "difficulty": "INTERMEDIATE",
    "order": 2
  },
  "progress": {
    "current": 2,
    "total": 5
  }
}
```

#### Response (Interview Complete)
```json
{
  "isComplete": true,
  "evaluation": {
    "score": 7.0,
    "feedback": "Good answer with room for improvement. Consider mentioning best practices for data validation."
  },
  "message": "Congratulations! You've completed the Excel mock interview. Click below to view your detailed report."
}
```

#### Response Schema
| Field | Type | Description |
|-------|------|-------------|
| `isComplete` | boolean | Whether interview is finished |
| `evaluation` | object | AI evaluation of the answer |
| `evaluation.score` | number | Score out of 10 |
| `evaluation.feedback` | string | Detailed feedback |
| `nextQuestion` | object | Next question (if not complete) |
| `progress` | object | Interview progress (if not complete) |
| `progress.current` | number | Current question number |
| `progress.total` | number | Total questions in interview |
| `message` | string | Completion message (if complete) |

#### Error Responses
- `404` - Question not found
- `400` - Invalid request body
- `500` - Failed to process answer

---

### 4. Get Interview Report

**GET** `/api/interview/[id]/report`

Generate and retrieve a comprehensive interview performance report.

#### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Interview session identifier |

#### Response
```json
{
  "interview": {
    "id": "clr123abc456def789",
    "candidateName": "John Doe",
    "candidateEmail": "john.doe@example.com",
    "startedAt": "2025-07-25T10:00:00.000Z",
    "completedAt": "2025-07-25T10:15:00.000Z",
    "totalScore": 7.8,
    "status": "COMPLETED"
  },
  "performance": {
    "overallScore": 7.8,
    "categoryScores": {
      "BASIC_OPERATIONS": 8.5,
      "FORMULAS_FUNCTIONS": 7.0,
      "DATA_ANALYSIS": 8.0,
      "PIVOT_TABLES": 7.5,
      "PROBLEM_SOLVING": 7.0
    },
    "questionsAnswered": 5,
    "totalQuestions": 5
  },
  "feedback": {
    "overallFeedback": "Strong performance with good foundational Excel skills. Demonstrates solid understanding of basic operations and data analysis. Areas for improvement include advanced formula usage and problem-solving approaches.",
    "strengths": [
      "Excellent knowledge of basic Excel operations",
      "Good understanding of data analysis concepts",
      "Clear and concise explanations"
    ],
    "areasForImprovement": [
      "Advanced formula combinations",
      "Complex problem-solving scenarios",
      "Optimization techniques"
    ],
    "recommendations": [
      "Practice INDEX-MATCH combinations",
      "Learn advanced pivot table features",
      "Study Excel best practices documentation"
    ]
  },
  "questions": [
    {
      "id": "clr123question456",
      "question": "How do you select all data in a worksheet quickly?",
      "category": "BASIC_OPERATIONS",
      "difficulty": "BEGINNER",
      "answer": {
        "text": "You can select all data by pressing Ctrl+A or clicking the intersection of row and column headers.",
        "score": 8.5,
        "feedback": "Excellent answer! You correctly identified both methods."
      }
    }
  ]
}
```

#### Response Schema

**Interview Object**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Interview identifier |
| `candidateName` | string | Candidate name |
| `candidateEmail` | string | Candidate email |
| `startedAt` | string | Interview start timestamp (ISO 8601) |
| `completedAt` | string | Interview completion timestamp (ISO 8601) |
| `totalScore` | number | Overall interview score |
| `status` | string | Interview status |

**Performance Object**
| Field | Type | Description |
|-------|------|-------------|
| `overallScore` | number | Average score across all questions |
| `categoryScores` | object | Score breakdown by Excel category |
| `questionsAnswered` | number | Number of questions answered |
| `totalQuestions` | number | Total questions in interview |

**Feedback Object**
| Field | Type | Description |
|-------|------|-------------|
| `overallFeedback` | string | AI-generated summary assessment |
| `strengths` | array | List of identified strengths |
| `areasForImprovement` | array | List of improvement areas |
| `recommendations` | array | List of learning recommendations |

**Questions Array**
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Question identifier |
| `question` | string | Question text |
| `category` | string | Excel skill category |
| `difficulty` | string | Question difficulty |
| `answer` | object | Candidate's answer and evaluation |

#### Error Responses
- `404` - Interview not found
- `500` - Failed to generate report

---

## Data Models

### Question Categories
- `BASIC_OPERATIONS` - Basic Excel operations and navigation
- `FORMULAS_FUNCTIONS` - Excel formulas and functions
- `DATA_ANALYSIS` - Data manipulation and analysis
- `PIVOT_TABLES` - Pivot table creation and usage
- `MACROS_VBA` - Macros and VBA programming
- `PROBLEM_SOLVING` - Real-world Excel problem solving

### Difficulty Levels
- `BEGINNER` - Basic Excel knowledge required
- `INTERMEDIATE` - Moderate Excel experience needed
- `ADVANCED` - Expert-level Excel skills required

### Interview Status
- `IN_PROGRESS` - Interview is currently active
- `COMPLETED` - Interview finished successfully
- `ABANDONED` - Interview started but not completed

---

## Example Workflows

### Complete Interview Flow

1. **Start Interview**
   ```bash
   POST /api/interview/start
   ```

2. **Answer Questions** (Repeat 5 times)
   ```bash
   POST /api/interview/answer
   ```

3. **Get Report**
   ```bash
   GET /api/interview/{interviewId}/report
   ```

### Sample cURL Commands

**Start Interview:**
```bash
curl -X POST http://localhost:3000/api/interview/start \
  -H "Content-Type: application/json" \
  -d '{
    "candidateName": "John Doe",
    "candidateEmail": "john.doe@example.com"
  }'
```

**Submit Answer:**
```bash
curl -X POST http://localhost:3000/api/interview/answer \
  -H "Content-Type: application/json" \
  -d '{
    "interviewId": "clr123abc456def789",
    "questionId": "clr123question456",
    "answerText": "Use Ctrl+A to select all data"
  }'
```

**Get Report:**
```bash
curl http://localhost:3000/api/interview/clr123abc456def789/report
```

---

## SDK and Client Libraries

### JavaScript/TypeScript
```typescript
// Interview Client Example
class InterviewClient {
  async startInterview(candidateInfo: {
    candidateName?: string;
    candidateEmail?: string;
  }) {
    const response = await fetch('/api/interview/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(candidateInfo)
    });
    return response.json();
  }

  async submitAnswer(data: {
    interviewId: string;
    questionId: string;
    answerText: string;
  }) {
    const response = await fetch('/api/interview/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async getReport(interviewId: string) {
    const response = await fetch(`/api/interview/${interviewId}/report`);
    return response.json();
  }
}
```

---

## Webhook Support (Future)

In future versions, webhook support will be available for:
- Interview completion notifications
- Real-time score updates
- Integration with HR systems

---

**API Version**: 1.0  
**Last Updated**: July 25, 2025  
**Status**: Production Ready
