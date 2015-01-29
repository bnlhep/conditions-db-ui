<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">

    <div class="container-fluid">
    
        <div class="navbar-header">
        
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/#">RFORE</a>
        
        </div>
        
        <div class="collapse navbar-collapse">

            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="fa fa-tachometer"></i>
                        Reports <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/reports/#status"><i class="fa fa-check"></i> Facility Status</a></li>
                        <li><a href="/reports/#forecast"><i class="fa fa-sun-o"></i> Forecasting</a></li>
                    </ul>
                </li>
            </ul>
            
            <form class="navbar-form navbar-left navbar-input-group" role="search">
                <div class="form-group">
                    <input type="text" class="form-control dark" placeholder="Search..." />
                </div>
            </form>
            
            <div class="nav navbar-right">
                <ul class="nav navbar-nav" id="internal" style="display:none">
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-lock"></i>
                            Internal <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="http://192.101.104.248:8080" target="_blank"><i class="fa fa-external-link"></i> Maintenance</a></li>
                            <li><a href="http://192.101.104.248:8080" target="_blank"><i class="fa fa-external-link"></i> Problem Reporting</a></li>
                            <li><a href="http://192.101.104.248:8080" target="_blank"><i class="fa fa-external-link"></i> Quality Assurance</a></li>
                            <li><a href="http://192.101.104.248:8080" target="_blank"><i class="fa fa-external-link"></i> Change Request</a></li>
                            <li class="divider"></li>
                            <li><a href="#">Catalog Management</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="navbar-form navbar-right">
                    <div class="form-group">
                        <button id="login" type="button" class="btn btn-primary"><i class="fa fa-user"></i> Login</button>
                        <button id="logout" type="button" class="btn btn-primary" style="display:none"><i class="fa fa-user"></i> Logout</button>
                    </div>
                </form>
            </div>
        
        </div>
    
    </div>

</nav>