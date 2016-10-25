$(document).ready(
	function(){
		$(".goptransfer").click(function(){
			if($(".header-first").css("display")=="block")
			{
				$(".header-first").hide();
				$(".header-second").show();
			}
			else
			{
				$(".header-first").show();
				$(".header-second").hide();
			}
		});
	}
	
	
);