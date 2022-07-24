;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.announcementForm',{_lastValue:'',_textField:null,_timer:0,initialize:function(){this._textField=$('#elInput_announce_url');this.on('blur','#elInput_announce_url',this.fieldKeyUp);},fieldKeyUp:function(){clearTimeout(this._timer);this._timer=setTimeout(_.bind(this._checkPermissions,this),700);},_checkPermissions:function(){var value=this._textField.val().trim();if(value.length<3){return;}
ips.getAjax()('?app=core&module=system&controller=announcement&do=permissionCheck',{dataType:'json',data:{url:value}}).done(function(response){if(_.isUndefined(response.html)&&$('#elAnnouncementGroupWarning').length){$('#elAnnouncementGroupWarning').remove();}
if($('#elAnnouncementGroupWarning').length){$('#elAnnouncementGroupWarning').replaceWith(response.html);}
else{$(response.html).insertAfter('#elInput_announce_url');}}).fail(function(err){});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.approveQueue',{initialize:function(){this.on('click','[data-action="approvalQueueNext"]',this.doConfirm);},doConfirm:function(e,data){e.preventDefault();var self=this;var action=$(e.currentTarget).attr('data-type');if(action!=='delete'){self.doAction(e,data);return;}
var alert={type:'confirm',icon:'warn',message:ips.getString('generic_confirm'),subText:'',callbacks:{ok:function(){self.doAction(e,data);},no:function(){return;}}};ips.ui.alert.show(alert);},doAction:function(e,data){e.preventDefault();var scope=$(this.scope);if($(e.currentTarget).hasClass('ipsButton_disabled')){ips.ui.alert.show({type:'alert',icon:'warn',message:ips.getString('approvalQueueNoPerm')});return;}
var height=$('#elApprovePanel').height();$('#elApprovePanel').html('').css('height',height).addClass('ipsLoading');ips.getAjax()($(e.currentTarget).attr('href'),{bypassRedirect:true}).done(function(){ips.getAjax()(scope.attr('data-url')).done(function(response){scope.html(response.html);$('#elModCPApprovalCount').html(response.count);}).fail(function(failresponse){window.location=scope.attr('data-url');});}).fail(function(){window.location=$(e.currentTarget).attr('href');});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.report',{initialize:function(){this.on(document,'submitDialog','[data-role="warnUserDialog"]',this.dialogSubmitted);this.on('menuItemSelected',this.menuItemSelected);},menuItemSelected:function(e,data){data.originalEvent.preventDefault();var link=data.menuElem.find('[data-ipsMenuValue="'+data.selectedItemID+'"] a');var langString=(data.selectedItemID=='spamFlagButton')?ips.getString('confirmFlagAsSpammer'):ips.getString('confirmUnFlagAsSpammer');var descString=(data.selectedItemID=='spamUnFlagButton')?ips.getString('confirmUnFlagAsSpammerDesc'):'';var self=this;if(data.selectedItemID=='spamFlagButton'||data.selectedItemID=='spamUnFlagButton'){ips.ui.alert.show({type:'confirm',message:langString,subText:descString,callbacks:{ok:function(){self._startLoading();ips.getAjax()(link.attr('href'),{bypassRedirect:true}).done(function(response){self._refreshPanel();});},}});}},dialogSubmitted:function(e,data){this._startLoading();this._refreshPanel();},_startLoading:function(){this.scope.find('[data-role="authorPanel"]').css('height',this.scope.find('[data-role="authorPanel"]').height()+'px').addClass('ipsLoading').find('*').hide();},_refreshPanel:function(){var self=this;ips.getAjax()(window.location,{bypassRedirect:true}).done(function(response){self.scope.find('[data-role="authorPanel"]').css('height','auto').removeClass('ipsLoading').html(response);});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.reportList',{initialize:function(){this.on('menuItemSelected','[data-action="changeStatus"]',this.changeReportStatus);},changeReportStatus:function(e,data){if(data.originalEvent){data.originalEvent.preventDefault();}
var row=$(e.currentTarget).closest('.ipsDataItem');row.removeClass('ipsDataItem_new ipsDataItem_warning');switch(data.selectedItemID){case'1':row.addClass('ipsDataItem_new');break;case'2':row.addClass('ipsDataItem_warning');break;}}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.reportToggle',{initialize:function(){this.on('menuItemSelected',this.reportToggled);},reportToggled:function(e,data){var item=data.menuElem.find('[data-ipsmenuvalue="'+data.selectedItemID+'"]');var icon=item.find('[data-role="ipsMenu_selectedIcon"]').attr('class');var status=item.find('[data-role="ipsMenu_selectedText"]').text();this.scope.find('[data-role="reportIcon"]').get(0).className=icon;this.scope.find('[data-role="reportStatus"]').text(status);ips.ui.flashMsg.show(ips.getString('reportStatusChanged'));}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.warnForm',{pointsEdited:false,expirationEdited:false,editorSetTo:'',initialize:function(){var self=this;this.on('change','[name="warn_reason"]',this.changeReason);this.on('change','[name="warn_points"]',this.changePoints);this.on('change','[name="warn_remove"],[name="warn_remove_time"]',function(e){self.expirationEdited=true;});this.on('editorWidgetInitialized',this.editorInitialized);},editorInitialized:function(e,data){if(data.id=='warn_member_note'){$('[name="warn_reason"]').change();}},changeReason:function(e){var scope=this.scope;var self=this;ips.getAjax()(ips.getSetting('baseURL')+'index.php?app=core&module=system&controller=warnings&do=reasonAjax&id='+$(e.target).val()).done(function(response){if(self.pointsEdited==false||response.points_override==0){var pointsNow=scope.find('[name="warn_points"]').val();scope.find('[name="warn_points"]').val(response.points).prop('disabled',response.points_override==0);if(pointsNow!=response.points){scope.find('[name="warn_points"]').change();}
self.pointsEdited=false;}
var removePointsUnlimited=scope.find('[name="warn_remove_unlimited"]');if(response.remove.unlimited){if(self.expirationEdited==false||response.remove_override==0){if(removePointsUnlimited.prop('checked')==false){if(removePointsUnlimited.prop('disabled')==true){removePointsUnlimited.prop('disabled',false).click().prop('disabled',true);}else{removePointsUnlimited.click();}}}}else if(self.expirationEdited==false||response.remove_override==0){removePointsUnlimited.prop('checked',false);scope.find('[name="warn_remove"]').val(response.remove.date).prop('disabled',response.remove_override==0);scope.find('[name="warn_remove_time"]').val(response.remove.time).prop('disabled',response.remove_override==0);}
removePointsUnlimited.prop('disabled',response.remove_override==0);var cheevPoints=scope.find('[name="warn_cheeve_point_reduction"]');if(response.cheev_override==0){cheevPoints.prop('disabled',true);}else{cheevPoints.prop('disabled',false);}
cheevPoints.val(response.cheev_point_reduction);var editor=ips.ui.editor.getObj($('textarea[name="warn_member_note"]').closest('[data-ipsEditor]'));if(response.notes){var currentContents=editor.getInstance().getData();var previousContents=self.editorSetTo;editor.unminimize(function(){if(currentContents==previousContents){editor.reset();}else{editor.insertHtml('<p></p>');}
editor.insertHtml(response.notes);editor.resetDirty();self.editorSetTo=editor.getInstance().getData();});}});},changePoints:function(e){this.pointsEdited=true;var scope=this.scope;ips.getAjax()(ips.getSetting('baseURL')+'index.php?app=core&module=system&controller=warnings&do=actionAjax&points='+$(e.target).val()+'&member='+scope.attr('data-member')).done(function(response){var types=['mq','rpa','suspend'];scope.find('ul#elWarningPenalties').remove();if(parseInt(response.override)){scope.find('li#form_warn_punishment .ipsFieldRow_content').show();}
else{scope.find('li#form_warn_punishment .ipsFieldRow_content').hide();var enforcedPenalties=[];for(var i=0;i<3;i++){if(parseInt(response.actions[types[i]].unlimited)){enforcedPenalties.push(ips.getString('warningPunishmentIndefinitely',{type:ips.getString('warningPunishment_'+types[i])}));}
else if(response.actions[types[i]].date!=""){var date=new Date(response.actions[types[i]].date+' '+response.actions[types[i]].time);enforcedPenalties.push(ips.getString('warningPunishmentDate',{type:ips.getString('warningPunishment_'+types[i]),date:ips.utils.time.localeDateString(date,{dateStyle:"long",timeStyle:"short"})}));}
scope.find('[name="warn_punishment['+types[i]+']"]').prop('checked',false).change();}
scope.find('li#form_warn_punishment').append(ips.templates.render('system.warningpenalty.nomodify',{penalties:enforcedPenalties}));}
for(var i=0;i<3;i++){if(parseInt(response.override)){scope.find('[name="warn_punishment['+types[i]+']"]').prop('checked',(response.actions[types[i]].date||response.actions[types[i]].unlimited)).change();}
scope.find('[name="warn_'+types[i]+'"]').val(response.actions[types[i]].date).prop('disabled',!parseInt(response.override));scope.find('[name="warn_'+types[i]+'_time"]').val(response.actions[types[i]].time).prop('disabled',!parseInt(response.override));scope.find('[name="warn_'+types[i]+'_unlimited"]').prop('checked',response.actions[types[i]].unlimited).prop('disabled',!parseInt(response.override));}});}});}(jQuery,_));;
;(function($,_,undefined){"use strict";ips.controller.register('core.front.modcp.warnPopup',{initialize:function(){this.on('click','[data-action="revoke"]',this.revokeWarning);},revokeWarning:function(e){e.preventDefault();var url=$(e.currentTarget).attr('href');ips.ui.alert.show({type:'verify',icon:'question',message:ips.getString('revokeWarning'),buttons:{yes:ips.getString('reverseAndDelete'),no:ips.getString('justDelete'),cancel:ips.getString('cancel')},callbacks:{yes:function(){window.location=url+'&undo=1';},no:function(){window.location=url+'&undo=0';}}});}});}(jQuery,_));;