var Canvas =
{
  canvas:null,
  canvasjq:null,
  context:null,
  initialize:function()
  {
    this.canvas = document.querySelectorAll("body > #mainCanvas")[0];
    this.canvas.width = $(window).width();
    this.canvas.height = $(window).height();
    this.canvasjq = $("body > #mainCanvas");
    this.context = this.canvas.getContext("2d");
  }
};

var Toolbox =
{
  hidden: false,
  busy: false,
  initialize:function()
  {
    $("body > #toolbox > form > .thing").mouseenter(function(event)
    {
      var description = $(event.target).parent().children("desc").html();
      var x = $(event.target).offset().left;
      var y = $(event.target).offset().top;
      Toolbox.Tooltip.show(x, y, description);
    });

    $("body > #toolbox").mouseleave(function()
    {
      Toolbox.Tooltip.hide();
    });
  },
  hide:function()
  {
    if(!this.hidden)
    {
      if(!this.busy)
      {
        this.busy = true;
        $("body > #toolbox").fadeOut("fast", function()
        {
          $("body > #toolboxToggle").animate({bottom: "16px"}, 200, function()
          {
            Toolbox.busy = false;
            Toolbox.hidden = true;
          });
        });
      }
    }
  },
  show:function()
  {
    if(this.hidden)
    {
      this.hidden = false;
      if(!this.busy)
      {
        this.busy = true;
        $("body > #toolboxToggle").animate({bottom: "64px"}, 200, function()
        {
          $("body > #toolbox").fadeIn("fast", function()
          {
            Toolbox.busy = false;
            Toolbox.hidden = false;
          });
        });
      }
    }
  },
  toggle:function()
  {
    if(this.hidden)
    {
      this.show();
    }
    else
    {
      this.hide();
    }
  },
  Tooltip:
  {
    show:function(x, y, text)
    {
      $("body > #toolboxTooltip").html(text);
      var tp = y - $("body > #toolboxTooltip").outerHeight() - 16;
      $("body > #toolboxTooltip").css(
      {
        top: tp,
        left: x
      });
      $("body > #toolboxTooltip").fadeIn();
    },
    hide:function()
    {
      $("body > #toolboxTooltip").fadeOut();
    }
  }
};

(function()
{
  $(document).ready(function()
  {
    Canvas.initialize();
    Toolbox.initialize();

    setTimeout(function()
    {
      Toolbox.hide();
    }, 1000);

    $("body > #toolboxToggle").click(function()
    {
      Toolbox.toggle();
    });
  });
})();

var nothing = function()
{};
