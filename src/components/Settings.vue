<template>
  <div class="settings-container">
    <h2>Settings</h2>

    <div class="button-group">
      <button @click="showContent('privacy')" class="settings-button">Privacy</button>
      <button @click="showContent('dispute')" class="settings-button">Dispute & Claims Center</button>
      <button @click="showContent('policy')" class="settings-button">Policy</button>
    </div>

    <div class="content-display" v-if="activeContent">
      <h3>{{ activeContentTitle }}</h3>
      <p>{{ activeContentText }}</p>
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
          text: "Here are the privacy settings and policies.",
        },
        dispute: {
          title: "Dispute & Claims Center",
          text: "Information about dispute and claims handling.",
        },
        policy: {
          title: "Policy",
          text: "Here is the policy document.",
        },
      },
    };
  },
  computed: {
    activeContentTitle() {
      return this.contentData[this.activeContent]?.title;
    },
    activeContentText() {
      return this.contentData[this.activeContent]?.text;
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
  flex-direction: column;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.settings-button {
  background-color: #d3d3d3;
  border: 1px solid #aaa;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  transition: background-color 0.3s;
}

.settings-button:hover {
  background-color: #bbb;
}

.content-display {
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.content-display h3 {
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
