var over = false;
var me = true; //鎴�
var _nowi = 0, _nowj = 0; //璁板綍鑷繁涓嬫鐨勫潗鏍�
var _compi = 0, _compj = 0; //璁板綍璁＄畻鏈哄綋鍓嶄笅妫嬬殑鍧愭爣
var _myWin = [], _compWin = []; //璁板綍鎴戯紝璁＄畻鏈鸿耽鐨勬儏鍐�
var backAble = false, returnAble = false; 
var resultTxt = document.getElementById('result-wrap');

            var chressBord = [];//妫嬬洏
            for(var i = 0; i < 15; i++){
                chressBord[i] = [];
                for(var j = 0; j < 15; j++){
                    chressBord[i][j] = 0;
                }
            }

            //璧㈡硶鐨勭粺璁℃暟缁�
            var myWin = [];
            var computerWin = [];

            //璧㈡硶鏁扮粍
            var wins = [];
            for(var i = 0; i < 15; i++){
                wins[i] = [];
                for(var j = 0; j < 15; j++){
                    wins[i][j] = [];
                }
            }

            var count = 0; //璧㈡硶鎬绘暟
            //妯嚎璧㈡硶
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[i][j+k][count] = true;
                    }
                    count++;
                }
            }

            //绔栫嚎璧㈡硶
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[j+k][i][count] = true;
                    }
                    count++;
                }
            }

            //姝ｆ枩绾胯耽娉�
            for(var i = 0; i < 11; i++){
                for(var j = 0; j < 11; j++){
                    for(var k = 0; k < 5; k++){
                        wins[i+k][j+k][count] = true;
                    }
                    count++;
                }
            }

            //鍙嶆枩绾胯耽娉�
            for(var i = 0; i < 11; i++){ 
                for(var j = 14; j > 3; j--){
                    for(var k = 0; k < 5; k++){
                        wins[i+k][j-k][count] = true;
                    }
                    count++;
                }
            }
            // debugger;
            for(var i = 0; i < count; i++){
                myWin[i] = 0;
                _myWin[i] = 0;
                computerWin[i] = 0;
                _compWin[i] = 0;
            }
            var chess = document.getElementById("chess");
            var context = chess.getContext('2d');

            context.strokeStyle = '#bfbfbf'; //杈规棰滆壊

            var backbtn = document.getElementById("goback");
            var returnbtn = document.getElementById("return");

            window.onload = function(){
                drawChessBoard(); // 鐢绘鐩�
            }

            document.getElementById("restart").onclick = function(){
                window.location.reload();
            }
            // 鎴戯紝涓嬫
            chess.onclick = function(e){
                if(over){
                    return;
                }
                if(!me){
                    return;
                }
                // 鎮旀鍔熻兘鍙敤
                backbtn.className = backbtn.className.replace( new RegExp( "(\\s|^)unable(\\s|$)" )," " ); 
                var x = e.offsetX;
                var y = e.offsetY;
                var i = Math.floor(x / 30);
                var j = Math.floor(y / 30);
                _nowi = i;
                _nowj = j;
                if(chressBord[i][j] == 0){
                    oneStep(i,j,me);
                    chressBord[i][j] = 1; //鎴戯紝宸插崰浣嶇疆        
                                
                    for(var k = 0; k < count; k++){ // 灏嗗彲鑳借耽鐨勬儏鍐甸兘鍔�1
                        if(wins[i][j][k]){
                            // debugger;
                            myWin[k]++;
                            _compWin[k] = computerWin[k];
                            computerWin[k] = 6;//杩欎釜浣嶇疆瀵规柟涓嶅彲鑳借耽浜�
                            if(myWin[k] == 5){
                                // window.alert('浣犺耽浜�');
                                resultTxt.innerHTML = '鎭枩锛屼綘璧簡锛�';
                                over = true;
                            }
                        }
                    }
                    if(!over){
                        me = !me;
                        computerAI();
                    }
                }         
            }
            // 鎮旀
            backbtn.onclick = function(e){
                if(!backAble) { return;}
                over = false;
                me = true;
                // resultTxt.innerHTML = 'o(鈺枴鈺�)o锛屾倲妫嬩腑';
                // 鎾ら攢鎮旀鍔熻兘鍙敤
                returnbtn.className = returnbtn.className.replace( new RegExp( "(\\s|^)unable(\\s|$)" )," " ); 
                // 鎴戯紝鎮旀
                chressBord[_nowi][_nowj] = 0; //鎴戯紝宸插崰浣嶇疆 杩樺師
                minusStep(_nowi, _nowj); //閿€姣佹瀛�                                  
                for(var k = 0; k < count; k++){ // 灏嗗彲鑳借耽鐨勬儏鍐甸兘鍑�1
                    if(wins[_nowi][_nowj][k]){
                        myWin[k]--;
                        computerWin[k] = _compWin[k];//杩欎釜浣嶇疆瀵规柟鍙兘璧�
                    }
                }

                // 璁＄畻鏈虹浉搴旂殑鎮旀
                chressBord[_compi][_compj] = 0; //璁＄畻鏈猴紝宸插崰浣嶇疆 杩樺師
                minusStep(_compi, _compj); //閿€姣佹瀛�                                  
                for(var k = 0; k < count; k++){ // 灏嗗彲鑳借耽鐨勬儏鍐甸兘鍑�1
                    if(wins[_compi][_compj][k]){
                        computerWin[k]--;
                        myWin[k] = _myWin[i];//杩欎釜浣嶇疆瀵规柟鍙兘璧�
                    }
                }
                resultTxt.innerHTML = '--鐩婃櫤浜斿瓙妫�--';
                returnAble = true;
                backAble = false;
            }
            // 鎾ら攢鎮旀
            returnbtn.onclick = function(e){
                if(!returnAble) { return; }
                   // 鎴戯紝鎾ら攢鎮旀
                chressBord[_nowi][_nowj] = 1; //鎴戯紝宸插崰浣嶇疆 
                oneStep(_nowi,_nowj,me);                              
                for(var k = 0; k < count; k++){ 
                    if(wins[_nowi][_nowj][k]){
                        myWin[k]++;
                        _compWin[k] = computerWin[k];
                        computerWin[k] = 6;//杩欎釜浣嶇疆瀵规柟涓嶅彲鑳借耽
                    }
                    if(myWin[k] == 5){
                        resultTxt.innerHTML = '鎭枩锛屼綘璧簡锛�';
                        over = true;
                    }
                }

                // 璁＄畻鏈烘挙閿€鐩稿簲鐨勬倲妫�
                chressBord[_compi][_compj] = 2; //璁＄畻鏈猴紝宸插崰浣嶇疆   
                oneStep(_compi,_compj,false);                               
                for(var k = 0; k < count; k++){ // 灏嗗彲鑳借耽鐨勬儏鍐甸兘鍑�1
                    if(wins[_compi][_compj][k]){
                        computerWin[k]++;
                        _myWin[k] = myWin[k];
                        myWin[k] = 6;//杩欎釜浣嶇疆瀵规柟涓嶅彲鑳借耽
                    }
                    if(computerWin[k] == 5){
                        resultTxt.innerHTML = 'o(鈺枴鈺�)o锛岃绠楁満璧簡锛岀户缁姞娌瑰摝锛�';
                        over = true;
                    }
                }
                returnbtn.className += ' '+ 'unable';
                returnAble = false;
                backAble = true;
            }
            // 璁＄畻鏈轰笅妫�
            var computerAI = function (){
                var myScore = [];
                var computerScore = [];
                var max = 0;
                var u = 0, v = 0;
                for(var i = 0; i < 15; i++){
                    myScore[i] = [];
                    computerScore[i] = [];
                    for(var j = 0; j < 15; j++){
                        myScore[i][j] = 0;
                        computerScore[i][j] = 0;
                    }
                }
                for(var i = 0; i < 15; i++){
                    for(var j = 0; j < 15; j++){
                        if(chressBord[i][j] == 0){
                            for(var k = 0; k < count; k++){
                                if(wins[i][j][k]){
                                    if(myWin[k] == 1){
                                        myScore[i][j] += 200;
                                    }else if(myWin[k] == 2){
                                        myScore[i][j] += 400;
                                    }else if(myWin[k] == 3){
                                        myScore[i][j] += 2000;
                                    }else if(myWin[k] == 4){
                                        myScore[i][j] += 10000;
                                    }
                                    
                                    if(computerWin[k] == 1){
                                        computerScore[i][j] += 220;
                                    }else if(computerWin[k] == 2){
                                        computerScore[i][j] += 420;
                                    }else if(computerWin[k] == 3){
                                        computerScore[i][j] += 2100;
                                    }else if(computerWin[k] == 4){
                                        computerScore[i][j] += 20000;
                                    }                        
                                }
                            }
                            
                            if(myScore[i][j] > max){
                                max  = myScore[i][j];
                                u = i;
                                v = j;
                            }else if(myScore[i][j] == max){
                                if(computerScore[i][j] > computerScore[u][v]){
                                    u = i;
                                    v = j;    
                                }
                            }
                            
                            if(computerScore[i][j] > max){
                                max  = computerScore[i][j];
                                u = i;
                                v = j;
                            }else if(computerScore[i][j] == max){
                                if(myScore[i][j] > myScore[u][v]){
                                    u = i;
                                    v = j;    
                                }
                            }
                            
                        }
                    }
                }
                _compi = u;
                _compj = v;
                oneStep(u,v,false);
                chressBord[u][v] = 2;  //璁＄畻鏈哄崰鎹綅缃�
                for(var k = 0; k < count; k++){
                    if(wins[u][v][k]){
                        computerWin[k]++;
                        _myWin[k] = myWin[k];
                        myWin[k] = 6;//杩欎釜浣嶇疆瀵规柟涓嶅彲鑳借耽浜�
                        if(computerWin[k] == 5){
                            resultTxt.innerHTML = 'o(鈺枴鈺�)o锛岃绠楁満璧簡锛岀户缁姞娌瑰摝锛�';
                            over = true;
                        }
                    }
                }
                if(!over){
                    me = !me;
                }
                backAble = true;
                returnAble = false;
                var hasClass = new RegExp('unable').test(' ' + returnbtn.className + ' ');
                if(!hasClass) {
                    returnbtn.className += ' ' + 'unable';
                }
            }
            
            
            //缁樼敾妫嬬洏
            var drawChessBoard = function() {
                for(var i = 0; i < 15; i++){
                    context.moveTo(15 + i * 30 , 15);
                    context.lineTo(15 + i * 30 , 435);
                    context.stroke();
                    context.moveTo(15 , 15 + i * 30);
                    context.lineTo(435 , 15 + i * 30);
                    context.stroke();
                }
            }
            //鐢绘瀛�
            var oneStep = function(i,j,me) {
                context.beginPath();
                context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);// 鐢诲渾
                context.closePath();
                //娓愬彉
                var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);

                if(me){
                    gradient.addColorStop(0,'#0a0a0a');
                    gradient.addColorStop(1,'#636766');
                }else{
                    gradient.addColorStop(0,'#d1d1d1');
                    gradient.addColorStop(1,'#f9f9f9');
                }
                context.fillStyle = gradient;
                context.fill();
            }
            //閿€姣佹瀛�
            var minusStep = function(i,j) {
                //鎿﹂櫎璇ュ渾
                context.clearRect((i) * 30, (j) * 30, 30, 30);

                // 閲嶇敾璇ュ渾鍛ㄥ洿鐨勬牸瀛�
                context.beginPath();
                context.moveTo(15+i*30 , j*30);
                context.lineTo(15+i*30 , j*30 + 30);
                context.moveTo(i*30, j*30+15);
                context.lineTo((i+1)*30 , j*30+15);
    
                context.stroke();
            }