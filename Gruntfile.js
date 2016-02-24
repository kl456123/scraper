module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),



		//  configue tasks
		jshint: {
			source: {
				src: ['getJokes.js'],
				options: {
					jshintrc: '.jshintrc',
				},
			},

			testJshint: {
				src: ['test/*.test.js'],
				options: {
					jshintrc: 'test/.jshintrc',
				},
			},
		},

		watch: {
			options: {
				spawn: false,
				igonres: 'Gruntfile.js',
			},
			source: {
				files: ['*.js'],
				tasks: ['jshint:source'],

			},
			mocha: {
				files: ['test/*.test.js'],
				tasks: ['jshint:testJshint', 'mochaTest'],
			},
		},
		mochaTest: {
			options: {
				reporter: 'spec',
				// require: 'test/mocha.opts',
			},
			src: ['test/*test.js'],
		},
	});



	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');


	grunt.registerTask('default', ['jshint:source', 'watch:source']);
	grunt.registerTask('test', ['mochaTest', 'watch:mocha']);
};