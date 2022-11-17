(function(window, $){
window.wp=window.wp||{};
function wpMediaElement(){
var settings={};
function initialize(){
if(typeof _wpmejsSettings!=='undefined'){
settings=$.extend(true, {}, _wpmejsSettings);
}
settings.classPrefix='mejs-';
settings.success=settings.success||function(mejs){
var autoplay, loop;
if(mejs.rendererName&&-1!==mejs.rendererName.indexOf('flash')){
autoplay=mejs.attributes.autoplay&&'false'!==mejs.attributes.autoplay;
loop=mejs.attributes.loop&&'false'!==mejs.attributes.loop;
if(autoplay){
mejs.addEventListener('canplay', function(){
mejs.play();
}, false);
}
if(loop){
mejs.addEventListener('ended', function(){
mejs.play();
}, false);
}}
};
settings.customError=function(media, node){
if(-1!==media.rendererName.indexOf('flash')||-1!==media.rendererName.indexOf('flv')){
return '<a href="' + node.src + '">' + mejsL10n.strings['mejs.download-video'] + '</a>';
}};
$('.wp-audio-shortcode, .wp-video-shortcode')
.not('.mejs-container')
.filter(function (){
return ! $(this).parent().hasClass('mejs-mediaelement');
})
.mediaelementplayer(settings);
}
return {
initialize: initialize
};}
window.wp.mediaelement=new wpMediaElement();
$(window.wp.mediaelement.initialize);
})(window, jQuery);