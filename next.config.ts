// next.config.js
module.exports = {
  generateBuildId: async () => {
    const buildId = `${Date.now()}`;
    // Set the build ID as an environment variable
    process.env.NEXT_PUBLIC_BUILD_ID = buildId;
    return buildId;
  },
};
