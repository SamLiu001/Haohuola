$(document).ready(function() {
	var mall=Cookies.get('mall');
	if(!mall){
		Cookies.set('mall','all');
		mall='all';
	}
	var cate=Cookies.get('cate');
	if(!cate){
		Cookies.set('cate','all');
		cate='all';
	}
	$('.mallItem').click(function(event) {
		var mall=$(this).attr('data');
		$('.mallItem-link').removeClass('now-mall');
		$(this).children().addClass('now-mall');
		Cookies.set('mall',mall);
		window.open('/','_self');
	});
	$('.mall-'+mall).addClass('now-mall');

	$('.cateItem').click(function(event) {
		var cate=$(this).attr('data');
		$('.cateItem-link').removeClass('now-cate');
		$(this).children().addClass('now-cate');
		Cookies.set('cate',cate);
		window.open('/','_self');
	});
	$('.cate-'+cate).addClass('now-cate');
});