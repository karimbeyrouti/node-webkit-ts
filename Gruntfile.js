module.exports = function(grunt) {

  grunt.initConfig({

      // Config

      meta: {

          tsFile:       'src/Main.ts',          // TypeScript export source
          tsExportFile: 'app/js/Main.js'        // JavaScript export target

      },

    // Compile TypeScript

    ts: {

        MainJsFile: {

          src: ['<%= meta.tsFile %>'],
          out: '<%= meta.tsExportFile %>',

          options: {
              target: 'ES5',
              sourcemap: false,
              declaration: true,
              comments: true
          }
        }
    },

    // Compile Node Webkit App

    nodewebkit: {

        options: {

            build_dir:  './build',
            credits:    './app/credits.html',
            mac_icns:   './icon.icns',
            mac:        true,
            win:        true,
            linux32:    false,
            linux64:    false

        },

        src: './app/**/*' // Your node-webkit app

    }

    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask('default', [ 'ts' , 'nodewebkit']);

};
