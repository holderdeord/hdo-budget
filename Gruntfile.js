module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      web: {
        cmd: "node web.js"
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      browsers: {
        autowatch: true
      },
      travis: {
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },
    less: {
      development: {
        options: {
          paths: ["./less"]
        },
        files: {
          "./css/budget.css": "./less/budget.less"
        }
      }
    },
    watch: {
      files: "./less/*",
      tasks: ["less"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test:browsers', ['karma:browsers']);
  grunt.registerTask('test:travis', ['karma:travis']);
  grunt.registerTask('default', ['exec:web']);
};
