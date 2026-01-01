

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Anchor: AI-Powered Anxiety Relief Companion

![Status](https://img.shields.io/badge/Status-Beta-blue) ![Stack](https://img.shields.io/badge/Tech-Python%20%7C%20LangChain%20%7C%20OpenAI%20%7C%20Streamlit-green)

## 📋 Overview
**Anchor** is a real-time mental health intervention tool designed to de-escalate anxiety attacks and provide grounding techniques using Generative AI. 

While generic chatbots often provide vague advice, Anchor utilizes a **Retrieval-Augmented Generation (RAG)** pipeline grounded in Cognitive Behavioral Therapy (CBT) principles. It features strict safety guardrails to ensure responses are empathetic, actionable, and non-clinical, acting as an immediate "digital anchor" for users in distress.

## 🚀 Key Features
* **SOS "Grounding" Mode:** A low-latency, high-priority workflow that immediately guides the user through the 5-4-3-2-1 technique or breathing exercises when high distress is detected.
* **Sentiment & Urgency Classification:** Uses a pre-classification agent to detect the severity of user input (e.g., General Stress vs. Panic Attack) and routes the conversation to the appropriate model logic.
* **Personalized Affirmation Engine:** Generates context-aware affirmations based on the user's specific triggers, stored in a local vector memory.
* **Privacy-First Architecture:** Ensures user session data is anonymized and not used for model training.

## 🛠️ Architecture & Tech Stack

### The Core Loop
* **Frontend:** Streamlit (for rapid prototyping) / React Native (planned).
* **Orchestrator:** LangChain (managing conversation state and agent routing).
* **LLM:** GPT-4o (for complex reasoning) and GPT-3.5-Turbo (for low-latency responses).
* **Vector Database:** Pinecone (storing CBT frameworks and user-specific "safe thoughts").

### Data Flow
1.  **Input Analysis:** User text/voice is analyzed for sentiment score (-1.0 to 1.0).
2.  **Safety Guardrails:** Input is checked against self-harm/crisis protocols (using Guardrails AI or custom Python logic). *If critical, provides emergency resources immediately.*
3.  **Context Retrieval:** The system retrieves relevant grounding techniques from the Vector DB.
4.  **Response Generation:** The LLM constructs a response using a "Therapeutic Persona" system prompt focused on de-escalation.

## 🔧 Workflow Diagram

```mermaid
graph TD
    A[User Input] --> B{Safety Check / Guardrails}
    B -->|Crisis Detected| C[Emergency Protocol / Resources]
    B -->|Safe| D{Sentiment Classifier}
    D -->|High Anxiety| E[SOS Grounding Module]
    D -->|General Stress| F[Conversational CBT Module]
    E --> G[Generate Response]
    F --> G
    G --> H[Output to User]
    💡 Engineering Challenges & Solutions
Challenge: Latency during a panic attack is unacceptable.

Solution: Implemented a "Hybrid Routing" system. If "SOS" keywords are detected, the system bypasses the complex RAG lookup and serves a cached, immediate grounding exercise.

Challenge: Hallucination of medical advice.

Solution: Strict system prompting ("You are a supportive companion, not a doctor") and temperature set to 0.2 for deterministic, consistent outputs.

👤 Author
Anthony Lee Creative AI Engineer Portfolio
