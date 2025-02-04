module.exports = {
  publicRuntimeConfig: {
    buildId:
      process.env.VERCEL_BUILD_ID ||
      process.env.NEXT_PUBLIC_BUILD_ID ||
      "dev-build",
  },
};
