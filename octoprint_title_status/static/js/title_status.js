$(function() {
	function TitleStatusViewModel(viewModels) {
		var self = this;
		
		self.onAllBound = function () {
			self.default_title = document.title;
		}
		
		self.onDataUpdaterPluginMessage = function (plugin, data) {
			if (plugin != "title_status") {
				return;
			}
			self._update(data);
		} 
		
		self.onEventPrinterStateChanged = function(payload) {
			self._update(payload.state_id);
		}
		
		self.createTitle = function(text){
			if (text == "") {
				document.title = self.default_title;
			} else if (text.endsWith(" ")) {
				document.title = text + self.default_title;
			} else { 
				document.title = text;
			}
		}
		
		self._update = function (status) {
			switch (status) {
				case "OFFLINE": 
					self.createTitle("* ");
					break;
				case "CONNECTING":
					self.createTitle("Connecting...");
					break;
				case "OPERATIONAL":
					self.createTitle("");
					break;
				case "PRINTING":
					self.createTitle("△ ")
					break;
				case "PAUSED":
					self.createTitle("Paused...")
					break;
				case "ERROR":
				case "CLOSED_WITH_ERROR":
					self.createTitle("ERROR !! ")
					break;
				case "UNKNOWN":
				case "NONE":
					self.createTitle("? ")
					break;
			}
		}
	}
	ADDITIONAL_VIEWMODELS.push([TitleStatusViewModel, [], []]);
});

