import os

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY not found. Check your .env file."
    )

client = genai.Client(api_key=api_key)


def ask_ai_tutor(
    message: str,
    career_goal: str,
    student_name: str = "Student",
    context: str = "",
):

    system_prompt = f"""
You are CareerOS AI Tutor, an intelligent and friendly career mentor.

Student name: {student_name}

Career goal: {career_goal}

Your job is to:

- Teach concepts clearly and step-by-step.
- Adapt explanations to a college student.
- Give practical examples.
- Connect answers to the student's career goal.
- Keep answers concise unless the student asks for detail.
- Encourage the student and suggest what to learn next.

Additional student context:

{context}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.7-flash",
            contents=message,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt
            ),
        )

        return response.text

    except Exception as e:
        print("\nGEMINI ERROR:")
        print(e)
        raise