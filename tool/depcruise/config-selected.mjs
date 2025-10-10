export default {
  options: {
    doNotFollow: ['node_modules'],

    reporterOptions: {
      dot: {
        filters: {
          includeOnly: {
            path: '^src/ts',
          },

          exclude: {
            path: [
              'src/ts/ui/site/portfolio/glass/application/ApplicationLogger.ts',
              'src/ts/ui/site/portfolio/glass/application/ApplicationDispatcher.ts',
              'src/ts/ui/site/portfolio/glass/application/ApplicationDispatcherEvent.ts',
            ],
          },
        },
      },
    },
  },
};
