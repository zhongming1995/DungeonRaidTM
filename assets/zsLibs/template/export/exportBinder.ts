/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FGUI_RecordPage from "./FGUI_RecordPage";
import FGUI_btn_share from "./FGUI_btn_share";
import FGUI_btn_drop_share from "./FGUI_btn_drop_share";
import FGUI_btn_more_game from "./FGUI_btn_more_game";
import FGUI_KnockVideo from "./FGUI_KnockVideo";
import FGUI_btn_knock from "./FGUI_btn_knock";

export default class exportBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(FGUI_RecordPage.URL, FGUI_RecordPage);
		fgui.UIObjectFactory.setExtension(FGUI_btn_share.URL, FGUI_btn_share);
		fgui.UIObjectFactory.setExtension(FGUI_btn_drop_share.URL, FGUI_btn_drop_share);
		fgui.UIObjectFactory.setExtension(FGUI_btn_more_game.URL, FGUI_btn_more_game);
		fgui.UIObjectFactory.setExtension(FGUI_KnockVideo.URL, FGUI_KnockVideo);
		fgui.UIObjectFactory.setExtension(FGUI_btn_knock.URL, FGUI_btn_knock);
	}
}