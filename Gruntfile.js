/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    bower_concat: {
      all: {
        dest: 'views/assets/dist/lib.js',
        cssDest: 'views/assets/dist/lib.css',
        mainFiles: {
          'bootstrap-material-datetimepicker' : [
            'css/bootstrap-material-datepicker.css',
            'js/bootstrap-material-datepicker.js'
          ]
        },
        dependencies: { 
          'bootstrap-material-datetimepicker' : ['jquery', 'momentjs']
        },
        includeDev : true
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask('default', ['bower_concat']);
};