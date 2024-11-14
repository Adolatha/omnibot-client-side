<template>
  <div class="settings-container">
    <div class="settings-box">
      <h2>Settings</h2>

      <!-- Buttons Section -->
      <div class="button-group">
        <button
            @click="showContent('privacy')"
            :class="['settings-button', { 'active-button': activeContent === 'privacy' }]"
        >
          Privacy
        </button>
        <button
            @click="showContent('dispute')"
            :class="['settings-button', { 'active-button': activeContent === 'dispute' }]"
        >
          Dispute & Claims Center
        </button>
        <button
            @click="showContent('policy')"
            :class="['settings-button', { 'active-button': activeContent === 'policy' }]"
        >
          Policy
        </button>
      </div>

      <!-- Content Display Section -->
      <div class="content-display" v-if="activeContent">
        <h3>{{ activeContentTitle }}</h3>
        <div v-html="activeContentHTML"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      activeContent: null,
      contentData: {
        privacy: {
          title: "Privacy",
          html: "<p>Here are the privacy settings and policies.</p>",
        },
        dispute: {
          title: "Dispute & Claims Center",
          html: `
            <ol>
              <li><strong>Report an Incident</strong>
                <p>If an OmniBot robot causes damage, report it within 48 hours via the Customer Support Chat. Provide details and any relevant photos for review.</p>
              </li>
              <li><strong>Video Review</strong>
                <p>OmniBot robots record footage 2 minutes before and after an incident:</p>
                <ul>
                  <li>User Access: Request footage via the chat.</li>
                  <li>Company Access: OmniBot accesses footage only when a formal claim is filed.</li>
                </ul>
              </li>
              <li><strong>Property Damage Claims</strong>
                <p>Report property damage through the chat. OmniBot will review the footage and logs, and compensate up to ADCO 10,000 for basic tasks or ADCO 50,000 for high-risk tasks. Service credits or refunds may apply if the robot fails to complete the task.</p>
              </li>
              <li><strong>Personal Injury Claims</strong>
                <p>For injuries caused by OmniBot robots, file a claim via chat. Compensation varies:</p>
                <ul>
                  <li>Basic Tasks: Up to ADCO 5,000 for medical expenses and ADCO 2,500 for rehabilitation.</li>
                  <li>Advanced Tasks: Up to ADCO 20,000 for medical and ADCO 10,000 for disability compensation.</li>
                </ul>
              </li>
              <li><strong>Dispute Resolution</strong>
                <p>Disputes are handled through the chat:</p>
                <ul>
                  <li>Submit a Dispute: Open a dispute via the chat.</li>
                  <li>Negotiation: Review and discuss with the support team.</li>
                  <li>Arbitration: If unresolved, a neutral third-party arbitrator will issue a binding decision.</li>
                </ul>
              </li>
              <li><strong>Claim Updates</strong>
                <p>Track claim progress through the chat, with real-time updates.</p>
              </li>
              <li><strong>Refunds & Credits</strong>
                <p>For incomplete tasks due to robot malfunctions, file a claim via the chat to receive a refund or service credit.</p>
              </li>
              <li><strong>Coverage Limits</strong>
                <p>OmniBot provides:</p>
                <ul>
                  <li>Basic Coverage: Up to ADCO 10,000 for property damage.</li>
                  <li>Advanced Coverage: Up to ADCO 50,000 for damage or injuries during high-risk tasks.</li>
                </ul>
              </li>
            </ol>
          `,
        },
        policy: {
          title: "Policy",
          html: "<p>Here is the policy document.</p>",
        },
      },
    };
  },
  computed: {
    activeContentTitle() {
      return this.contentData[this.activeContent]?.title;
    },
    activeContentHTML() {
      return this.contentData[this.activeContent]?.html;
    },
  },
  methods: {
    showContent(contentKey) {
      this.activeContent = contentKey;
    },
  },
};
</script>


<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.settings-box {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 600px;
  width: 100%;
  text-align: left;
  border: 1px solid #e0e0e0;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.settings-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 123, 255, 0.2);
}

.settings-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.settings-button:active {
  transform: translateY(1px);
}

.active-button {
  background-color: #0056b3;
  box-shadow: 0 6px 8px rgba(0, 123, 255, 0.3);
  font-weight: 600;
  border: 2px solid #003366;
  color: #e0e0e0;
}

.content-display {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  text-align: left;
}

.content-display h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.content-display p,
.content-display ul,
.content-display ol {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.content-display li {
  margin-bottom: 10px;
}
</style>
