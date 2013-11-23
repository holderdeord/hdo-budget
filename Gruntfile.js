module.exports = function(grunt) {
	grunt.initConfig({
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				autowatch: true
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', ['karma']);
	grunt.registerTask('default', ['connect']);
};
