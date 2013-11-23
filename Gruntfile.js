module.exports = function(grunt) {
	grunt.initConfig({
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				autowatch: true
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
		connect: {
			server: {
				options: {
					port: 9001,
					base: '.',
					keepalive: true
				}
			}
		},
		watch: {
			files: "./less/*",
			tasks: ["less"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', ['karma']);
	grunt.registerTask('default', ['connect']);
};
