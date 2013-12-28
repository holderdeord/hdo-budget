module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      deployment: {
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
      deployment: {
        options: {
          paths: ["./less"]
        },
        files: {
          "./css/budget.css": "./less/budget.less"
        }
      }
    },
    uglify: {
      deployment: {
        files: {
          'app/budget.min.js': ['app/budget.js']
        }
      }
    },
    watch: {
      browserify: {
        files: "./src/*",
        tasks: ["browserify:deployment"]
      },
      build: {
        files: ["./src/*", "./less/*"],
        tasks: ["build"]
      },
      buster: {
        files: ["./test/node/*", "./src/*"],
        tasks: ["buster::test"]
      },
      less: {
        files: "./less/*",
        tasks: ["less:deployment"]
      },
      uglify: {
        files: "./app/budget.js",
        tasks: ["uglify:deployment"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-buster');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma:travis', 'buster::test']);
  grunt.registerTask('test:buster', ['buster::test']);
  grunt.registerTask('test:karma', ['karma:browsers']);
  grunt.registerTask('web', ['exec:web']);
  grunt.registerTask('build', ['browserify:deployment', 'uglify:deployment', 'less:deployment']);
  grunt.registerTask('default', ['build', 'exec:web']);
};
