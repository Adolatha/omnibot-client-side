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

        <!-- Privacy Content with Sliders -->
        <div v-if="activeContent === 'privacy'">
          <div v-for="(item, index) in privacySettings" :key="index" class="privacy-item">
            <div class="privacy-item-text">
              <img :src="`/2024-2025/group-23/images/privacy/${item.icon}`" alt="icon" class="privacy-icon" />
              <p>{{ item.text }}</p>
            </div>
            <input type="checkbox" v-model="item.enabled" class="slider" />
          </div>
        </div>

        <!-- Other Content Sections -->
        <div v-else v-html="activeContentHTML"></div>
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
        policy: {
          title: "Policy",
          html: `<h3>1. User Responsibilities</h3>\n      <p>As an OmniBot user, you play a crucial role in maintaining the safety and effectiveness of our services. You are required to:</p>\n      <ul>\n        <li><strong>Follow Guidelines:</strong> Operate the OmniBot in accordance with the instructions provided within the app and the user manual. Familiarize yourself with all functionalities before usage.</li>\n        <li><strong>Provide Accurate Information:</strong> Ensure that all details entered during registration and task scheduling are truthful and up to date. This includes your location, task descriptions, and any specific instructions.</li>\n        <li><strong>Ensure a Safe Environment:</strong> Prior to deploying the OmniBot, inspect the area for potential hazards. Clear any obstacles, fragile items, or areas that may pose a risk to the robot or surrounding individuals.</li>\n      </ul>\n\n      <h3>2. Safety Protocols</h3>\n      <p>Your safety and the safety of others are our top priorities. To ensure this, OmniBot implements stringent safety protocols:</p>\n      <ul>\n        <li><strong>Pre-Deployment Inspection:</strong> Each robot undergoes a thorough inspection of its hardware and software systems before deployment. This includes checks for any mechanical defects, software malfunctions, and battery stability to prevent overheating.</li>\n        <li><strong>User Safety Alerts:</strong> Our robots are equipped with advanced sensors that provide the following safety features:</li>\n        <ul>\n          <li><strong>Proximity Sensors:</strong> Automatically halt operations when detecting nearby objects or individuals, preventing collisions and potential injuries.</li>\n          <li><strong>Object Detection & Avoidance:</strong> The robot can navigate around fragile objects such as glassware and vases to prevent damage.</li>\n          <li><strong>Overload Detection:</strong> If the robot is tasked with weights beyond its safe operating limits, it will stop functioning to prevent accidents.</li>\n        </ul>\n      </ul>\n\n      <h3>3. Damage and Liability</h3>\n      <p>In the unfortunate event of property damage or personal injury caused by the operation of an OmniBot, the following protocols will apply:</p>\n      <ul>\n        <li><strong>Property Damage Coverage:</strong> OmniBot assumes liability for damages resulting from operational malfunctions, with coverage limits as follows:</li>\n        <ul>\n          <li><strong>Basic Coverage:</strong> Up to $10,000 for damages incurred during low-risk tasks such as cleaning or delivery.</li>\n          <li><strong>Advanced Coverage:</strong> Up to $50,000 for damages resulting from high-risk tasks, such as industrial operations or security functions.</li>\n        </ul>\n        <li><strong>Personal Injury Claims:</strong> If a user sustains an injury due to the robot's actions, they may file a claim. Coverage will depend on the complexity of the task being performed at the time of the incident.</li>\n      </ul>\n\n      <h3>4. Dispute Resolution</h3>\n      <p>In the event of a dispute regarding property damage or personal injury, users can take the following steps:</p>\n      <ul>\n        <li><strong>Report Incidents:</strong> Users must report any incidents to the OmniBot customer support team via the in-app chat within 48 hours of occurrence.</li>\n        <li><strong>Claim Process:</strong> All claims will be reviewed by OmniBot's support team, which will assess the situation based on video footage and operational logs.</li>\n        <li><strong>Direct Communication:</strong> Users and the OmniBot support team will engage in discussions through the app to seek resolution. If a satisfactory resolution is not achieved, disputes may be escalated to third-party arbitration.</li>\n      </ul>\n\n      <h3>5. Data Privacy and Security</h3>\n      <p>OmniBot prioritizes your data privacy and security. We collect and handle user data in compliance with applicable laws:</p>\n      <ul>\n        <li><strong>Data Collection:</strong> OmniBot collects data to enhance user experience and improve service quality. This includes task history, user preferences, and operational data.</li>\n        <li><strong>User Control Over Data:</strong> Users have the right to access their data upon request. If a user wishes to delete their data, they can do so through the app, and it will be removed within 48 hours.</li>\n        <li><strong>Video Footage Security:</strong> Recorded video footage is encrypted to ensure that only authorized personnel can access it. Users can request access to their footage under certain conditions.</li>\n      </ul>\n\n      <h3>6. Cybersecurity</h3>\n      <p>To protect against cyber threats, OmniBot employs comprehensive cybersecurity measures:</p>\n      <ul>\n        <li><strong>Breach Notification:</strong> In the event of a data breach, users will be notified within 24 hours.</li>\n        <li><strong>Compensation for Breach:</strong> Users affected by a data breach may be eligible for compensation, including coverage for financial losses and identity theft support.</li>\n        <li><strong>Legal Support:</strong> OmniBot offers legal defense assistance for users impacted by data breaches, with coverage up to $50,000.</li>\n      </ul>\n\n      <h3>7. Service Availability</h3>\n      <p>OmniBot services are subject to availability based on various factors:</p>\n      <ul>\n        <li><strong>Limitations:</strong> Service may be restricted by geographical location, time, and the complexity of tasks.</li>\n        <li><strong>Modification Rights:</strong> OmniBot reserves the right to modify or discontinue services at any time without prior notice. Users will be informed of significant changes through the app.</li>\n      </ul>\n\n      <h3>8. Misuse and Abuse Policy</h3>\n      <p>To maintain a safe and productive environment, users must adhere to operational guidelines:</p>\n      <ul>\n        <li><strong>Proper Use:</strong> Users are responsible for using OmniBot in accordance with the provided instructions. Misuse, including overloading or tampering with the robot, will result in immediate termination of the rental agreement.</li>\n        <li><strong>Negligence and Coverage Exclusions:</strong> Damage caused by user negligence or misuse is not covered under OmniBot's liability policy. Users will be responsible for the full cost of repairs or replacements in such cases.</li>\n      </ul>\n\n      <h3>9. Child Safety and Privacy</h3>\n      <p>OmniBot is committed to ensuring the safety and privacy of children:</p>\n      <ul>\n        <li><strong>Child-Safety Features:</strong> When detecting children nearby, OmniBot activates special safety features that reduce movement speed and increase sensory awareness.</li>\n        <li><strong>Parental Controls:</strong> Parents can set no-go zones and monitor robot activity through the app to ensure child safety.</li>\n        <li><strong>Data Privacy for Minors:</strong> Any footage involving minors is encrypted and accessible only to parents or guardians.</li>\n      </ul>\n\n      <h3>10. Business Use Policy</h3>\n      <p>For corporate clients utilizing OmniBot for business purposes:</p>\n      <ul>\n        <li><strong>Task Optimization:</strong> OmniBot robots are equipped with specialized AI tailored for industrial and commercial operations.</li>\n        <li><strong>Extended Liability:</strong> Businesses have access to extended liability coverage, protecting against property damages and injuries.</li>\n        <li><strong>Fleet Management:</strong> Companies can monitor multiple robots in real-time through the app.</li>\n      </ul>\n\n      <h3>11. Changes to Policy</h3>\n      <p>OmniBot reserves the right to modify this policy as necessary. Users will be notified of significant changes through the app or via email.</p>\n\n      <h3>12. Contact Information</h3>\n      <p>For any questions or concerns, please contact our support team through the OmniBot app or via our official website.</p>`,
        },
        dispute: {
          title: "Dispute & Claims Center",
          html: `<ol>\n              <li><strong>Report an Incident</strong>\n                <p>If an OmniBot robot causes damage, report it within 48 hours via the Customer Support Chat. Provide details and any relevant photos for review.</p>\n              </li>\n              <li><strong>Video Review</strong>\n                <p>OmniBot robots record footage 2 minutes before and after an incident:</p>\n                <ul>\n                  <li>User Access: Request footage via the chat.</li>\n                  <li>Company Access: OmniBot accesses footage only when a formal claim is filed.</li>\n                </ul>\n              </li>\n              <li><strong>Property Damage Claims</strong>\n                <p>Report property damage through the chat. OmniBot will review the footage and logs, and compensate up to ADCO 10,000 for basic tasks or ADCO 50,000 for high-risk tasks. Service credits or refunds may apply if the robot fails to complete the task.</p>\n              </li>\n              <li><strong>Personal Injury Claims</strong>\n                <p>For injuries caused by OmniBot robots, file a claim via chat. Compensation varies:</p>\n                <ul>\n                  <li>Basic Tasks: Up to ADCO 5,000 for medical expenses and ADCO 2,500 for rehabilitation.</li>\n                  <li>Advanced Tasks: Up to ADCO 20,000 for medical and ADCO 10,000 for disability compensation.</li>\n                </ul>\n              </li>\n              <li><strong>Dispute Resolution</strong>\n                <p>Disputes are handled through the chat:</p>\n                <ul>\n                  <li>Submit a Dispute: Open a dispute via the chat.</li>\n                  <li>Negotiation: Review and discuss with the support team.</li>\n                  <li>Arbitration: If unresolved, a neutral third-party arbitrator will issue a binding decision.</li>\n                </ul>\n              </li>\n              <li><strong>Claim Updates</strong>\n                <p>Track claim progress through the chat, with real-time updates.</p>\n              </li>\n              <li><strong>Refunds & Credits</strong>\n                <p>For incomplete tasks due to robot malfunctions, file a claim via the chat to receive a refund or service credit.</p>\n              </li>\n              <li><strong>Coverage Limits</strong>\n                <p>OmniBot provides:</p>\n                <ul>\n                  <li>Basic Coverage: Up to ADCO 10,000 for property damage.</li>\n                  <li>Advanced Coverage: Up to ADCO 50,000 for damage or injuries during high-risk tasks.</li>\n                </ul>\n              </li>\n            </ol>`, // Your dispute content HTML here
        },
        privacy: {
          title: "Privacy",
        },
      },
      privacySettings: [
        {
          text: "Access Geo-location data to provide a customized experience",
          icon: "location.png",
        },
        {
          text: "Access mobile photos to list an item from your photo album",
          icon: "camera.png",
          enabled: true
        },
        {
          text: "Serve customized advertising",
          icon: "advertise.png",
          enabled: false
        },
        {
          text: "Share data with corporate family members to enhance your experience",
          icon: "share-data.png",
          enabled: true
        },
        {
          text: "Provide information to service providers under contract",
          icon: "wrench.png",
          enabled: true
        },
        {
          text: "Disclose data to law enforcement under legal obligations",
          icon: "law-enforcement.png",
          enabled: true
        },
        {
          text: "Protect your information with technical and administrative measures",
          icon: "lock.png",
          enabled: true
        }
      ]
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

.privacy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.privacy-item:last-child {
  border-bottom: none;
}

.privacy-item-text {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #666;
}

.privacy-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.slider {
  margin-left: 15px;
}
</style>
