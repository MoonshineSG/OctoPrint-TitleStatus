# coding=utf-8
import octoprint.plugin
import logging

class TitleStatusPlugin(octoprint.plugin.AssetPlugin):

	def initialize(self):
		#self._logger.setLevel(logging.DEBUG)
		
	def get_assets(self):
		return dict(
				js=["js/title_status.js"]
			)
			
	def get_version(self):
		return self._plugin_version

	def get_update_information(self):
		return dict(
			title_status=dict(
				displayName="Title Status",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="MoonshineSG",
				repo="OctoPrint-TitleStatus",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/MoonshineSG/OctoPrint-TitleStatus/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Title Status"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = TitleStatusPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}


