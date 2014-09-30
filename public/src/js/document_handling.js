	// opening existing files on launch when 2go is launched from the filebrowser
	$(document).ready(function(){
        AppVariables.getServerVars(function(){
			if (AppVariables.get("fullPath") != null) {
				// we need to open to a file on launch as the fullPath variable is set
				openFile(AppVariables.get("fullPath"));
			}
        });
    });

	// Opening a file into Purple Mash - if fullPath is not defined it will popup the filebrowser, otherwise it will open the file
	// you can call this function from the menu and it could get called on launch (see above)
	function openFile(fullPath) {
		DocumentHandler.open({
			thumb: '/css/pmfilebrowser/2go.png',
			filter: ".2go,.0pa",
			path: fullPath,
			onOpen: function (result) {
				// check for old 2go file extension and open with the old flash program
				if (result.path.substr(result.path.length-4) == ".0go") {
					parent.openExistingDocument({
						fullpath: result.path,
						launcher: "2go"
					});
					return;
				}			
				// otherwise we open the file (result.data) contains the data
				
			}
		});
	
	}
	
	// Saving a file into Purple Mash
    DocumentHandler.save({
        thumb: '/css/pmfilebrowser/2go.png',
        filter: ".2go",
        data: {
			// put the data you want to save here			
		},
        onSave: function (result) {
            pmAlert('Saved to ' + result.name);
        }
    });