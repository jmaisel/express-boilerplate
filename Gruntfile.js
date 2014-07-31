var Jade = require('jade');
var FileSystem = require('fs');
var Path = require('path');
var _ = require('underscore');

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			build : {
				options : {
					mangle : false,
					flatten : true
				},
				files : {
					'public/javascript/jade.js' : [ 'build/**/*.js' ],
				}
			}
		},
//		jade : {
//			options : {
//				pretty : true
//			},
//			template : {
//				options : {
//					client : true,
//					namespace : 'Templates'
//				},
//				expand : true,
//				cwd : 'views/browser',
//				src : [ '** /*.jade' ],
//				dest : 'build',
//				ext : ".js"
//			}
//		},
//		jadeClient: {
//		    helloWorld: {
//		      options: {
//		        requireJs: false
//		      },
//		      files: {
//		        'public/javascript/jade.js': {
//		        	'foo': 'build/**/*.js'
//		        },
//		      }
//		    }
//		},
		
		copy : {
			build : {
				cwd : 'node_modules/jade',
				src : [ 'runtime.js' ],
				dest : 'public/javascript',
				expand : true
			},
		},
		clean : {
			build : {
				src : [ 'build' ]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');

	// Default task(s).
	grunt.registerTask('default', [ 'jade', 'uglify', 'clean' ]);
//	grunt.registerTask('default', [ 'copy', 'jadeClient', 'uglify', 'clean' ]);

};