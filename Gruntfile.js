module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      test: {
        files: {
          'app/budget.js': ['src/*.js']
        }
      }
    },
    buster: {
      node: {

      }
    },
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
      browserify: {
        files: "./src/*",
        tasks: ["browserify:test"]
      },
      less: {
        files: "./less/*",
        tasks: ["less"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test:deployment', ['karma:travis', 'buster::test'])
  grunt.registerTask('test:browsers', ['karma:browsers']);
  grunt.registerTask('test:travis', ['karma:travis']);
  grunt.registerTask('default', ['exec:web']);
};
