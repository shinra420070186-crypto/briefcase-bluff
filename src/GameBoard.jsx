import React, { useEffect, useState } from 'react';
import { useGameStore } from './store';
import { sfx } from './sfx';

// ==============================================
// 1. NIGHT SKY BACKGROUND
// ==============================================
const MidnightSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ backgroundColor: '#050505' }}>
    <style>{`
      .stars { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .stars-1 {
        background-image: radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(1px 1px at 30% 20%, #fff, transparent), radial-gradient(1px 1px at 50% 50%, #fff, transparent), radial-gradient(1px 1px at 70% 30%, #fff, transparent), radial-gradient(1px 1px at 90% 10%, #fff, transparent);
        background-size: 100px 100px;
        animation: twinkle 3s ease-in-out infinite;
      }
      .stars-2 {
        background-image: radial-gradient(1.5px 1.5px at 20% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 60% 85%, #fff, transparent), radial-gradient(1.5px 1.5px at 85% 65%, #fff, transparent);
        background-size: 150px 150px;
        animation: twinkle 5s ease-in-out infinite 1s;
      }
      .stars-3 {
        background-image: radial-gradient(2px 2px at 40% 70%, #fff, transparent), radial-gradient(2px 2px at 10% 80%, #fff, transparent), radial-gradient(2px 2px at 80% 40%, #fff, transparent);
        background-size: 200px 200px;
        animation: twinkle 7s ease-in-out infinite 2s;
      }
      .meteor { position: absolute; width: 1.5px; height: 1.5px; background: #fff; border-radius: 50%; box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.5); opacity: 0; pointer-events: none; }
      .meteor::after { content: ""; position: absolute; top: 50%; transform: translateY(-50%); width: 40px; height: 1px; background: linear-gradient(90deg, #fff, transparent); }
      .m1 { top: 10%; left: 110%; animation: shoot 8s linear infinite; }
      .m2 { top: 30%; left: 110%; animation: shoot 12s linear infinite 4s; }
      .m3 { top: 50%; left: 110%; animation: shoot 10s linear infinite 2s; }
      .moon { position: absolute; top: 15%; right: 15%; width: 40px; height: 40px; border-radius: 50%; background: transparent; box-shadow: 7px 7px 0 0 #fdfbd3; filter: drop-shadow(0 0 7px rgba(253, 251, 211, 0.4)); z-index: 10; }
      
      @keyframes twinkle { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      @keyframes shoot { 0% { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; } 5% { opacity: 1; } 15% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } 100% { transform: translateX(-1500px) translateY(1000px) rotate(-35deg); opacity: 0; } }
    `}</style>
    <div className="stars stars-1"></div>
    <div className="stars stars-2"></div>
    <div className="stars stars-3"></div>
    <div className="meteor m1"></div>
    <div className="meteor m2"></div>
    <div className="meteor m3"></div>
    <div className="moon"></div>
  </div>
);

// ==============================================
// 2. NEW MORNING SKY BACKGROUND (Same Animation Style)
// ==============================================
const MorningSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, #4A90E2 0%, #FFB75E 100%)' }}>
    <style>{`
      .motes { position: absolute; inset: 0; background-repeat: repeat; pointer-events: none; }
      .motes-1 {
        background-image: radial-gradient(1.5px 1.5px at 15% 15%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 35% 25%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 55% 55%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 75% 35%, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 95% 15%, rgba(255,255,255,0.7), transparent);
        background-size: 100px 100px;
        animation: twinkle 4s ease-in-out infinite;
      }
      .motes-2 {
        background-image: radial-gradient(2px 2px at 25% 45%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 65% 85%, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 85% 70%, rgba(255,255,255,0.5), transparent);
        background-size: 150px 150px;
        animation: twinkle 6s ease-in-out infinite 2s;
      }
      .wind { position: absolute; width: 60px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent); border-radius: 50%; opacity: 0; pointer-events: none; }
      .w1 { top: 15%; left: 110%; animation: breeze 6s linear infinite; }
      .w2 { top: 40%; left: 110%; animation: breeze 10s linear infinite 3s; }
      .w3 { top: 60%; left: 110%; animation: breeze 8s linear infinite 1s; }
      .sun { position: absolute; top: 15%; right: 15%; width: 50px; height: 50px; border-radius: 50%; background: #FFD700; box-shadow: 0 0 40px 15px rgba(255, 215, 0, 0.5); z-index: 10; }
      
      @keyframes breeze { 0% { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-1500px); opacity: 0; } }
    `}</style>
    <div className="motes motes-1"></div>
    <div className="motes motes-2"></div>
    <div className="wind w1"></div>
    <div className="wind w2"></div>
    <div className="wind w3"></div>
    <div className="sun"></div>
  </div>
);

// ==============================================
// 3. NEW ACTIVE GAME SKY BACKGROUND (Jaykdoe Stars)
// ==============================================
const ActiveGameSky = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none active-game-sky">
    <style>{`
      .active-game-sky {
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
      }
      .active-game-sky #stars {
        width: 1px; height: 1px; background: transparent;
        box-shadow: 501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff, 1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff, 34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff, 473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff, 440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff, 126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff, 1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff, 638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff, 1866px 1847px #fff, 1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff, 1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff, 890px 607px #fff, 787px 1235px #fff, 557px 524px #fff, 1582px 1285px #fff, 1725px 1366px #fff, 952px 747px #fff, 251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff, 1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff, 594px 510px #fff, 1345px 1990px #fff, 1919px 1803px #fff, 1117px 966px #fff, 1629px 97px #fff, 1046px 1196px #fff, 810px 1092px #fff, 722px 976px #fff, 406px 18px #fff, 1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff, 564px 239px #fff, 13px 1767px #fff, 1482px 1472px #fff, 1700px 347px #fff, 1362px 244px #fff, 1141px 1708px #fff, 22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff, 1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff, 1061px 478px #fff, 18px 1409px #fff, 729px 1364px #fff, 264px 911px #fff, 677px 1442px #fff, 123px 33px #fff, 1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff, 918px 1536px #fff, 620px 948px #fff, 183px 646px #fff, 695px 687px #fff, 881px 272px #fff, 1521px 1212px #fff, 1423px 1022px #fff, 1545px 1271px #fff, 1393px 348px #fff, 685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff, 736px 999px #fff, 673px 796px #fff, 469px 850px #fff, 1912px 142px #fff, 1278px 664px #fff, 184px 1990px #fff, 1173px 1312px #fff, 782px 1879px #fff, 323px 1035px #fff, 611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff, 1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff, 1806px 1327px #fff, 386px 575px #fff, 1550px 463px #fff, 148px 687px #fff, 651px 1683px #fff, 1588px 1194px #fff, 1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff, 1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff, 1859px 1809px #fff, 1456px 388px #fff, 186px 1627px #fff, 1528px 1145px #fff, 171px 97px #fff, 674px 1072px #fff, 676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff, 1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff, 549px 652px #fff, 1338px 74px #fff, 1749px 364px #fff, 931px 369px #fff, 383px 1428px #fff, 1558px 389px #fff, 927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff, 556px 643px #fff, 401px 275px #fff, 406px 1644px #fff, 1253px 1852px #fff, 1599px 883px #fff, 744px 1721px #fff, 524px 1297px #fff, 1226px 1177px #fff, 1679px 55px #fff, 874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff, 1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff, 1163px 237px #fff, 61px 223px #fff, 592px 456px #fff, 1844px 271px #fff, 1324px 1488px #fff, 1373px 717px #fff, 1822px 709px #fff, 1464px 941px #fff, 1445px 1118px #fff, 991px 1414px #fff, 1964px 1076px #fff, 108px 172px #fff, 641px 1722px #fff, 1539px 427px #fff, 1697px 45px #fff, 1301px 1353px #fff, 1060px 329px #fff, 967px 1396px #fff, 493px 301px #fff, 1228px 1406px #fff, 1211px 1653px #fff, 444px 1822px #fff, 1746px 353px #fff, 1449px 381px #fff, 671px 887px #fff, 650px 138px #fff, 30px 1839px #fff, 1094px 1405px #fff, 273px 796px #fff, 1618px 1964px #fff, 1045px 1849px #fff, 1472px 1155px #fff, 1529px 1312px #fff, 728px 448px #fff, 44px 1908px #fff, 691px 818px #fff, 254px 293px #fff, 1981px 1133px #fff, 1307px 375px #fff, 196px 316px #fff, 1241px 1975px #fff, 1138px 1706px #fff, 1769px 463px #fff, 1768px 1428px #fff, 1730px 590px #fff, 1780px 523px #fff, 1862px 1526px #fff, 1613px 909px #fff, 1266px 1781px #fff, 470px 352px #fff, 699px 1682px #fff, 1002px 614px #fff, 1209px 133px #fff, 1842px 518px #fff, 1422px 1836px #fff, 1720px 1901px #fff, 470px 1788px #fff, 1355px 1387px #fff, 146px 1162px #fff, 933px 80px #fff, 681px 1063px #fff, 313px 1341px #fff, 740px 1498px #fff, 168px 1014px #fff, 345px 1355px #fff, 1498px 1562px #fff, 1626px 1358px #fff, 890px 403px #fff, 663px 562px #fff, 1481px 168px #fff, 22px 719px #fff, 774px 1041px #fff, 1899px 829px #fff, 430px 158px #fff, 430px 361px #fff, 1592px 1334px #fff, 224px 323px #fff, 1639px 1131px #fff, 7px 271px #fff, 1646px 1514px #fff, 1605px 1444px #fff, 1820px 1665px #fff, 1549px 1641px #fff, 1609px 1377px #fff, 486px 1098px #fff, 229px 613px #fff, 542px 1694px #fff, 318px 256px #fff, 1861px 918px #fff, 889px 892px #fff, 442px 1524px #fff, 19px 422px #fff, 1935px 1908px #fff, 828px 109px #fff, 862px 1248px #fff, 1275px 560px #fff, 906px 63px #fff, 337px 1605px #fff, 1691px 918px #fff, 1414px 679px #fff, 1726px 749px #fff, 1540px 1149px #fff, 1337px 1466px #fff, 446px 430px #fff, 676px 1616px #fff, 840px 326px #fff, 976px 977px #fff, 1840px 642px #fff, 1273px 804px #fff, 1071px 928px #fff, 1292px 1675px #fff, 29px 1148px #fff, 1585px 135px #fff, 1007px 563px #fff, 1035px 78px #fff, 1174px 574px #fff, 120px 1304px #fff, 845px 1292px #fff, 861px 540px #fff, 234px 232px #fff, 1940px 1367px #fff, 759px 639px #fff, 1775px 1381px #fff, 906px 372px #fff, 1104px 1165px #fff, 1524px 911px #fff, 1882px 330px #fff, 1389px 700px #fff, 300px 1629px #fff, 220px 1614px #fff, 563px 140px #fff, 1611px 1586px #fff, 793px 1316px #fff, 325px 1070px #fff, 1722px 1462px #fff, 1406px 1120px #fff, 1169px 1768px #fff, 1956px 1053px #fff, 959px 1587px #fff, 585px 1566px #fff, 370px 204px #fff, 1606px 1416px #fff, 443px 1606px #fff, 1499px 1102px #fff, 1943px 105px #fff, 1121px 1594px #fff, 1512px 32px #fff, 871px 1425px #fff, 433px 100px #fff, 294px 1471px #fff, 1688px 1755px #fff, 1666px 591px #fff, 1034px 300px #fff, 734px 1178px #fff, 1342px 313px #fff, 1616px 1590px #fff, 1763px 1472px #fff, 632px 1935px #fff, 1708px 872px #fff, 1871px 915px #fff, 1829px 1020px #fff, 1599px 578px #fff, 42px 585px #fff, 1163px 1382px #fff, 1744px 1272px #fff, 984px 1426px #fff, 1786px 1584px #fff, 1813px 379px #fff, 1867px 1127px #fff, 97px 567px #fff, 626px 988px #fff, 1178px 79px #fff, 1703px 211px #fff, 961px 1785px #fff, 110px 975px #fff, 953px 1941px #fff, 1027px 1790px #fff, 1665px 107px #fff, 11px 964px #fff, 1718px 1147px #fff, 21px 1728px #fff, 1358px 1922px #fff, 872px 65px #fff, 1191px 1635px #fff, 762px 681px #fff, 1519px 1033px #fff, 906px 566px #fff, 1074px 657px #fff, 1093px 415px #fff, 51px 198px #fff, 1075px 1418px #fff, 1547px 1070px #fff, 225px 920px #fff, 850px 1974px #fff, 981px 595px #fff, 1425px 131px #fff, 460px 917px #fff, 56px 495px #fff, 714px 428px #fff, 920px 493px #fff, 470px 1521px #fff, 532px 821px #fff, 1905px 71px #fff, 883px 1501px #fff, 294px 196px #fff, 381px 1999px #fff, 332px 793px #fff, 1246px 408px #fff, 233px 149px #fff, 315px 231px #fff, 1594px 1302px #fff, 696px 1585px #fff, 791px 136px #fff, 479px 199px #fff, 1627px 1413px #fff, 1824px 924px #fff, 1631px 342px #fff, 1251px 1151px #fff, 284px 1781px #fff, 497px 1052px #fff, 204px 1161px #fff, 646px 1499px #fff, 1762px 558px #fff, 854px 1833px #fff, 883px 945px #fff, 44px 982px #fff, 1101px 834px #fff, 515px 1748px #fff, 1578px 1435px #fff, 819px 1258px #fff, 776px 670px #fff, 115px 385px #fff, 1478px 434px #fff, 885px 20px #fff, 192px 1513px #fff, 78px 1129px #fff, 1774px 1105px #fff, 955px 1149px #fff, 1817px 1929px #fff, 1106px 1832px #fff, 1107px 1997px #fff, 94px 23px #fff, 243px 982px #fff, 43px 1972px #fff, 1798px 673px #fff, 1131px 1589px #fff, 841px 14px #fff, 826px 345px #fff, 687px 56px #fff, 1084px 32px #fff, 1887px 1878px #fff, 153px 526px #fff, 1828px 253px #fff, 1947px 1105px #fff, 886px 700px #fff, 1307px 1723px #fff, 1274px 651px #fff, 1530px 837px #fff, 1699px 1637px #fff, 1703px 1331px #fff, 1929px 1557px #fff, 1763px 737px #fff, 1118px 1680px #fff, 1545px 692px #fff, 1462px 1092px #fff, 208px 1667px #fff, 1393px 859px #fff, 186px 1794px #fff, 351px 1199px #fff, 642px 1995px #fff, 1061px 1726px #fff, 1708px 115px #fff, 1233px 1305px #fff, 637px 1786px #fff, 1730px 603px #fff, 75px 1240px #fff, 1704px 1326px #fff, 584px 346px #fff, 438px 1554px #fff, 561px 513px #fff, 1382px 225px #fff, 467px 1674px #fff, 1403px 815px #fff, 1546px 1835px #fff, 127px 1119px #fff, 276px 591px #fff, 688px 1458px #fff, 765px 646px #fff, 474px 984px #fff, 171px 361px #fff, 94px 1480px #fff, 1962px 1666px #fff, 909px 1037px #fff, 1725px 222px #fff, 253px 1355px #fff, 1892px 1901px #fff, 275px 1847px #fff, 28px 1184px #fff, 1725px 1382px #fff, 882px 647px #fff, 1935px 1046px #fff, 10px 344px #fff, 292px 1328px #fff, 127px 1352px #fff, 752px 929px #fff, 1589px 384px #fff, 284px 1829px #fff, 381px 820px #fff, 1229px 1125px #fff, 777px 429px #fff, 1811px 1499px #fff, 1573px 287px #fff, 295px 756px #fff, 389px 616px #fff, 781px 41px #fff, 1092px 333px #fff, 794px 1588px #fff, 386px 1847px #fff, 1802px 710px #fff, 662px 60px #fff, 640px 264px #fff, 463px 746px #fff, 1859px 799px #fff, 763px 37px #fff, 639px 396px #fff, 357px 1071px #fff, 1190px 1430px #fff, 1814px 257px #fff, 1382px 235px #fff, 606px 1304px #fff, 1939px 1470px #fff, 1124px 349px #fff, 307px 1567px #fff, 310px 1323px #fff, 1145px 922px #fff, 1196px 1922px #fff, 1647px 544px #fff, 788px 1337px #fff, 257px 632px #fff, 1413px 414px #fff, 590px 620px #fff, 582px 794px #fff, 1702px 1481px #fff, 1055px 53px #fff, 157px 346px #fff, 50px 1901px #fff, 1038px 1369px #fff, 796px 1941px #fff, 215px 194px #fff, 1567px 1538px #fff, 367px 800px #fff, 1044px 489px #fff, 1109px 1712px #fff, 524px 327px #fff, 525px 1252px #fff, 1475px 1240px #fff, 529px 436px #fff, 795px 834px #fff, 122px 1371px #fff, 79px 482px #fff, 520px 1249px #fff, 336px 1878px #fff, 188px 944px #fff, 325px 1259px #fff, 1491px 1942px #fff, 620px 1054px #fff, 1606px 1153px #fff, 1448px 502px #fff, 53px 1381px #fff, 107px 1670px #fff, 1380px 618px #fff, 967px 1557px #fff, 1116px 1722px #fff, 1174px 1044px #fff, 1805px 717px #fff, 663px 394px #fff, 1848px 1007px #fff, 389px 802px #fff, 49px 392px #fff, 1650px 852px #fff, 1678px 1012px #fff, 335px 1009px #fff, 1818px 1631px #fff, 1568px 742px #fff, 1162px 1991px #fff, 52px 1190px #fff, 1401px 928px #fff, 119px 1549px #fff, 537px 1529px #fff, 2px 1709px #fff, 122px 387px #fff, 543px 2px #fff, 27px 1971px #fff, 507px 1377px #fff, 1362px 1080px #fff, 1031px 1544px #fff, 1631px 1174px #fff, 1603px 312px #fff, 1626px 1422px #fff, 1430px 615px #fff, 1958px 1431px #fff, 1946px 1412px #fff, 1848px 247px #fff, 984px 1808px #fff, 1396px 225px #fff, 319px 717px #fff, 1252px 875px #fff, 1619px 156px #fff, 951px 1971px #fff, 386px 355px #fff, 1406px 1151px #fff, 273px 1538px #fff, 844px 1570px #fff, 947px 151px #fff, 1363px 525px #fff, 209px 307px #fff, 1923px 1718px #fff, 993px 1741px #fff, 1513px 353px #fff, 1353px 61px #fff, 664px 352px #fff, 1382px 359px #fff, 1487px 1707px #fff, 657px 1045px #fff, 1107px 490px #fff, 1834px 1176px #fff, 837px 1438px #fff, 1947px 448px #fff, 1196px 333px #fff, 151px 555px #fff, 18px 992px #fff, 458px 748px #fff, 1801px 890px #fff, 1093px 1012px #fff, 315px 1101px #fff, 194px 323px #fff, 754px 292px #fff, 1737px 7px #fff, 40px 840px #fff, 1170px 805px #fff, 176px 1753px #fff, 805px 1148px #fff, 1578px 1271px #fff, 367px 1494px #fff, 363px 1111px #fff, 1955px 243px #fff, 1451px 1093px #fff, 375px 617px #fff, 1223px 720px #fff, 1178px 13px #fff, 1456px 865px #fff, 1440px 49px #fff, 186px 1569px #fff, 320px 1853px #fff, 300px 539px #fff, 1559px 509px #fff, 1985px 1108px #fff, 1588px 828px #fff, 525px 1432px #fff, 831px 363px #fff, 141px 281px #fff, 1319px 402px #fff, 40px 456px #fff, 1955px 478px #fff, 1758px 818px #fff, 1924px 688px #fff, 1030px 953px #fff, 1982px 210px #fff, 917px 1401px #fff, 1051px 1837px #fff, 1045px 463px #fff, 1744px 573px #fff, 529px 1530px #fff, 542px 469px #fff, 1982px 324px #fff, 1902px 1422px #fff, 1968px 782px #fff, 1666px 1561px #fff, 955px 304px #fff, 323px 778px #fff, 272px 443px #fff, 485px 581px #fff, 1353px 1058px #fff, 1257px 131px #fff, 434px 98px #fff, 1587px 1953px #fff, 1749px 68px #fff, 1984px 839px #fff, 1518px 183px #fff, 1071px 855px #fff, 1662px 1994px #fff, 1111px 106px #fff, 1954px 838px #fff;
        animation: animStar 50s linear infinite;
      }
      .active-game-sky #stars:after {
        content: " ";
        position: absolute;
        top: 2000px;
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: 501px 811px #fff, 1450px 1324px #fff, 1093px 1780px #fff, 1469px 678px #fff, 904px 741px #fff, 1160px 781px #fff, 1841px 1962px #fff, 1630px 1667px #fff, 1788px 676px #fff, 367px 1734px #fff, 1343px 156px #fff, 1283px 1142px #fff, 1062px 378px #fff, 1395px 467px #fff, 1017px 1891px #fff, 137px 1114px #fff, 1767px 1403px #fff, 1543px 11px #fff, 1078px 181px #fff, 1189px 1574px #fff, 1697px 1551px #fff, 439px 472px #fff, 1491px 677px #fff, 1364px 599px #fff, 34px 382px #fff, 1221px 1584px #fff, 1266px 1499px #fff, 169px 1907px #fff, 1219px 1125px #fff, 659px 18px #fff, 1731px 1959px #fff, 332px 1216px #fff, 1913px 788px #fff, 80px 712px #fff, 326px 1605px #fff, 574px 1502px #fff, 473px 1653px #fff, 404px 975px #fff, 322px 1797px #fff, 425px 1321px #fff, 1121px 1797px #fff, 731px 647px #fff, 891px 1584px #fff, 1523px 109px #fff, 1379px 244px #fff, 865px 1064px #fff, 493px 956px #fff, 624px 1380px #fff, 440px 619px #fff, 1630px 767px #fff, 955px 1196px #fff, 62px 729px #fff, 126px 946px #fff, 1256px 896px #fff, 1444px 256px #fff, 661px 1628px #fff, 1078px 1716px #fff, 300px 737px #fff, 1734px 413px #fff, 1296px 129px #fff, 1771px 1678px #fff, 977px 1764px #fff, 1879px 549px #fff, 665px 1531px #fff, 89px 701px #fff, 1084px 1183px #fff, 1597px 1576px #fff, 1354px 1774px #fff, 554px 1471px #fff, 1469px 287px #fff, 887px 106px #fff, 1962px 766px #fff, 638px 805px #fff, 1651px 741px #fff, 1517px 1826px #fff, 24px 1152px #fff, 507px 558px #fff, 1262px 652px #fff, 246px 1048px #fff, 1077px 421px #fff, 1866px 1847px #fff, 1986px 1561px #fff, 704px 632px #fff, 1991px 1875px #fff, 1227px 395px #fff, 45px 1116px #fff, 247px 786px #fff, 890px 607px #fff, 787px 1235px #fff, 557px 524px #fff, 1582px 1285px #fff, 1725px 1366px #fff, 952px 747px #fff, 251px 458px #fff, 1500px 1250px #fff, 1999px 1734px #fff, 1336px 1955px #fff, 1705px 1464px #fff, 728px 697px #fff, 594px 510px #fff, 1345px 1990px #fff, 1919px 1803px #fff, 1117px 966px #fff, 1629px 97px #fff, 1046px 1196px #fff, 810px 1092px #fff, 722px 976px #fff, 406px 18px #fff, 1665px 1860px #fff, 1758px 1628px #fff, 1183px 463px #fff, 564px 239px #fff, 13px 1767px #fff, 1482px 1472px #fff, 1700px 347px #fff, 1362px 244px #fff, 1141px 1708px #fff, 22px 885px #fff, 374px 1309px #fff, 1034px 1037px #fff, 1725px 1086px #fff, 1343px 1921px #fff, 596px 903px #fff, 1061px 478px #fff, 18px 1409px #fff, 729px 1364px #fff, 264px 911px #fff, 677px 1442px #fff, 123px 33px #fff, 1303px 646px #fff, 1945px 792px #fff, 1305px 938px #fff, 918px 1536px #fff, 620px 948px #fff, 183px 646px #fff, 695px 687px #fff, 881px 272px #fff, 1521px 1212px #fff, 1423px 1022px #fff, 1545px 1271px #fff, 1393px 348px #fff, 685px 1910px #fff, 1446px 856px #fff, 73px 1201px #fff, 736px 999px #fff, 673px 796px #fff, 469px 850px #fff, 1912px 142px #fff, 1278px 664px #fff, 184px 1990px #fff, 1173px 1312px #fff, 782px 1879px #fff, 323px 1035px #fff, 611px 908px #fff, 565px 1449px #fff, 748px 1713px #fff, 1047px 490px #fff, 1040px 1872px #fff, 1818px 1659px #fff, 1806px 1327px #fff, 386px 575px #fff, 1550px 463px #fff, 148px 687px #fff, 651px 1683px #fff, 1588px 1194px #fff, 1831px 2px #fff, 581px 876px #fff, 1396px 1743px #fff, 1212px 1810px #fff, 421px 1920px #fff, 658px 1461px #fff, 1859px 1809px #fff, 1456px 388px #fff, 186px 1627px #fff, 1528px 1145px #fff, 171px 97px #fff, 674px 1072px #fff, 676px 1052px #fff, 1165px 1131px #fff, 1088px 781px #fff, 1231px 948px #fff, 330px 257px #fff, 426px 1046px #fff, 549px 652px #fff, 1338px 74px #fff, 1749px 364px #fff, 931px 369px #fff, 383px 1428px #fff, 1558px 389px #fff, 927px 133px #fff, 234px 1888px #fff, 1785px 1617px #fff, 556px 643px #fff, 401px 275px #fff, 406px 1644px #fff, 1253px 1852px #fff, 1599px 883px #fff, 744px 1721px #fff, 524px 1297px #fff, 1226px 1177px #fff, 1679px 55px #fff, 874px 1811px #fff, 838px 790px #fff, 1241px 430px #fff, 1676px 652px #fff, 1191px 568px #fff, 53px 1990px #fff, 1163px 237px #fff, 61px 223px #fff, 592px 456px #fff, 1844px 271px #fff, 1324px 1488px #fff, 1373px 717px #fff, 1822px 709px #fff, 1464px 941px #fff, 1445px 1118px #fff, 991px 1414px #fff, 1964px 1076px #fff, 108px 172px #fff, 641px 1722px #fff, 1539px 427px #fff, 1697px 45px #fff, 1301px 1353px #fff, 1060px 329px #fff, 967px 1396px #fff, 493px 301px #fff, 1228px 1406px #fff, 1211px 1653px #fff, 444px 1822px #fff, 1746px 353px #fff, 1449px 381px #fff, 671px 887px #fff, 650px 138px #fff, 30px 1839px #fff, 1094px 1405px #fff, 273px 796px #fff, 1618px 1964px #fff, 1045px 1849px #fff, 1472px 1155px #fff, 1529px 1312px #fff, 728px 448px #fff, 44px 1908px #fff, 691px 818px #fff, 254px 293px #fff, 1981px 1133px #fff, 1307px 375px #fff, 196px 316px #fff, 1241px 1975px #fff, 1138px 1706px #fff, 1769px 463px #fff, 1768px 1428px #fff, 1730px 590px #fff, 1780px 523px #fff, 1862px 1526px #fff, 1613px 909px #fff, 1266px 1781px #fff, 470px 352px #fff, 699px 1682px #fff, 1002px 614px #fff, 1209px 133px #fff, 1842px 518px #fff, 1422px 1836px #fff, 1720px 1901px #fff, 470px 1788px #fff, 1355px 1387px #fff, 146px 1162px #fff, 933px 80px #fff, 681px 1063px #fff, 313px 1341px #fff, 740px 1498px #fff, 168px 1014px #fff, 345px 1355px #fff, 1498px 1562px #fff, 1626px 1358px #fff, 890px 403px #fff, 663px 562px #fff, 1481px 168px #fff, 22px 719px #fff, 774px 1041px #fff, 1899px 829px #fff, 430px 158px #fff, 430px 361px #fff, 1592px 1334px #fff, 224px 323px #fff, 1639px 1131px #fff, 7px 271px #fff, 1646px 1514px #fff, 1605px 1444px #fff, 1820px 1665px #fff, 1549px 1641px #fff, 1609px 1377px #fff, 486px 1098px #fff, 229px 613px #fff, 542px 1694px #fff, 318px 256px #fff, 1861px 918px #fff, 889px 892px #fff, 442px 1524px #fff, 19px 422px #fff, 1935px 1908px #fff, 828px 109px #fff, 862px 1248px #fff, 1275px 560px #fff, 906px 63px #fff, 337px 1605px #fff, 1691px 918px #fff, 1414px 679px #fff, 1726px 749px #fff, 1540px 1149px #fff, 1337px 1466px #fff, 446px 430px #fff, 676px 1616px #fff, 840px 326px #fff, 976px 977px #fff, 1840px 642px #fff, 1273px 804px #fff, 1071px 928px #fff, 1292px 1675px #fff, 29px 1148px #fff, 1585px 135px #fff, 1007px 563px #fff, 1035px 78px #fff, 1174px 574px #fff, 120px 1304px #fff, 845px 1292px #fff, 861px 540px #fff, 234px 232px #fff, 1940px 1367px #fff, 759px 639px #fff, 1775px 1381px #fff, 906px 372px #fff, 1104px 1165px #fff, 1524px 911px #fff, 1882px 330px #fff, 1389px 700px #fff, 300px 1629px #fff, 220px 1614px #fff, 563px 140px #fff, 1611px 1586px #fff, 793px 1316px #fff, 325px 1070px #fff, 1722px 1462px #fff, 1406px 1120px #fff, 1169px 1768px #fff, 1956px 1053px #fff, 959px 1587px #fff, 585px 1566px #fff, 370px 204px #fff, 1606px 1416px #fff, 443px 1606px #fff, 1499px 1102px #fff, 1943px 105px #fff, 1121px 1594px #fff, 1512px 32px #fff, 871px 1425px #fff, 433px 100px #fff, 294px 1471px #fff, 1688px 1755px #fff, 1666px 591px #fff, 1034px 300px #fff, 734px 1178px #fff, 1342px 313px #fff, 1616px 1590px #fff, 1763px 1472px #fff, 632px 1935px #fff, 1708px 872px #fff, 1871px 915px #fff, 1829px 1020px #fff, 1599px 578px #fff, 42px 585px #fff, 1163px 1382px #fff, 1744px 1272px #fff, 984px 1426px #fff, 1786px 1584px #fff, 1813px 379px #fff, 1867px 1127px #fff, 97px 567px #fff, 626px 988px #fff, 1178px 79px #fff, 1703px 211px #fff, 961px 1785px #fff, 110px 975px #fff, 953px 1941px #fff, 1027px 1790px #fff, 1665px 107px #fff, 11px 964px #fff, 1718px 1147px #fff, 21px 1728px #fff, 1358px 1922px #fff, 872px 65px #fff, 1191px 1635px #fff, 762px 681px #fff, 1519px 1033px #fff, 906px 566px #fff, 1074px 657px #fff, 1093px 415px #fff, 51px 198px #fff, 1075px 1418px #fff, 1547px 1070px #fff, 225px 920px #fff, 850px 1974px #fff, 981px 595px #fff, 1425px 131px #fff, 460px 917px #fff, 56px 495px #fff, 714px 428px #fff, 920px 493px #fff, 470px 1521px #fff, 532px 821px #fff, 1905px 71px #fff, 883px 1501px #fff, 294px 196px #fff, 381px 1999px #fff, 332px 793px #fff, 1246px 408px #fff, 233px 149px #fff, 315px 231px #fff, 1594px 1302px #fff, 696px 1585px #fff, 791px 136px #fff, 479px 199px #fff, 1627px 1413px #fff, 1824px 924px #fff, 1631px 342px #fff, 1251px 1151px #fff, 284px 1781px #fff, 497px 1052px #fff, 204px 1161px #fff, 646px 1499px #fff, 1762px 558px #fff, 854px 1833px #fff, 883px 945px #fff, 44px 982px #fff, 1101px 834px #fff, 515px 1748px #fff, 1578px 1435px #fff, 819px 1258px #fff, 776px 670px #fff, 115px 385px #fff, 1478px 434px #fff, 885px 20px #fff, 192px 1513px #fff, 78px 1129px #fff, 1774px 1105px #fff, 955px 1149px #fff, 1817px 1929px #fff, 1106px 1832px #fff, 1107px 1997px #fff, 94px 23px #fff, 243px 982px #fff, 43px 1972px #fff, 1798px 673px #fff, 1131px 1589px #fff, 841px 14px #fff, 826px 345px #fff, 687px 56px #fff, 1084px 32px #fff, 1887px 1878px #fff, 153px 526px #fff, 1828px 253px #fff, 1947px 1105px #fff, 886px 700px #fff, 1307px 1723px #fff, 1274px 651px #fff, 1530px 837px #fff, 1699px 1637px #fff, 1703px 1331px #fff, 1929px 1557px #fff, 1763px 737px #fff, 1118px 1680px #fff, 1545px 692px #fff, 1462px 1092px #fff, 208px 1667px #fff, 1393px 859px #fff, 186px 1794px #fff, 351px 1199px #fff, 642px 1995px #fff, 1061px 1726px #fff, 1708px 115px #fff, 1233px 1305px #fff, 637px 1786px #fff, 1730px 603px #fff, 75px 1240px #fff, 1704px 1326px #fff, 584px 346px #fff, 438px 1554px #fff, 561px 513px #fff, 1382px 225px #fff, 467px 1674px #fff, 1403px 815px #fff, 1546px 1835px #fff, 127px 1119px #fff, 276px 591px #fff, 688px 1458px #fff, 765px 646px #fff, 474px 984px #fff, 171px 361px #fff, 94px 1480px #fff, 1962px 1666px #fff, 909px 1037px #fff, 1725px 222px #fff, 253px 1355px #fff, 1892px 1901px #fff, 275px 1847px #fff, 28px 1184px #fff, 1725px 1382px #fff, 882px 647px #fff, 1935px 1046px #fff, 10px 344px #fff, 292px 1328px #fff, 127px 1352px #fff, 752px 929px #fff, 1589px 384px #fff, 284px 1829px #fff, 381px 820px #fff, 1229px 1125px #fff, 777px 429px #fff, 1811px 1499px #fff, 1573px 287px #fff, 295px 756px #fff, 389px 616px #fff, 781px 41px #fff, 1092px 333px #fff, 794px 1588px #fff, 386px 1847px #fff, 1802px 710px #fff, 662px 60px #fff, 640px 264px #fff, 463px 746px #fff, 1859px 799px #fff, 763px 37px #fff, 639px 396px #fff, 357px 1071px #fff, 1190px 1430px #fff, 1814px 257px #fff, 1382px 235px #fff, 606px 1304px #fff, 1939px 1470px #fff, 1124px 349px #fff, 307px 1567px #fff, 310px 1323px #fff, 1145px 922px #fff, 1196px 1922px #fff, 1647px 544px #fff, 788px 1337px #fff, 257px 632px #fff, 1413px 414px #fff, 590px 620px #fff, 582px 794px #fff, 1702px 1481px #fff, 1055px 53px #fff, 157px 346px #fff, 50px 1901px #fff, 1038px 1369px #fff, 796px 1941px #fff, 215px 194px #fff, 1567px 1538px #fff, 367px 800px #fff, 1044px 489px #fff, 1109px 1712px #fff, 524px 327px #fff, 525px 1252px #fff, 1475px 1240px #fff, 529px 436px #fff, 795px 834px #fff, 122px 1371px #fff, 79px 482px #fff, 520px 1249px #fff, 336px 1878px #fff, 188px 944px #fff, 325px 1259px #fff, 1491px 1942px #fff, 620px 1054px #fff, 1606px 1153px #fff, 1448px 502px #fff, 53px 1381px #fff, 107px 1670px #fff, 1380px 618px #fff, 967px 1557px #fff, 1116px 1722px #fff, 1174px 1044px #fff, 1805px 717px #fff, 663px 394px #fff, 1848px 1007px #fff, 389px 802px #fff, 49px 392px #fff, 1650px 852px #fff, 1678px 1012px #fff, 335px 1009px #fff, 1818px 1631px #fff, 1568px 742px #fff, 1162px 1991px #fff, 52px 1190px #fff, 1401px 928px #fff, 119px 1549px #fff, 537px 1529px #fff, 2px 1709px #fff, 122px 387px #fff, 543px 2px #fff, 27px 1971px #fff, 507px 1377px #fff, 1362px 1080px #fff, 1031px 1544px #fff, 1631px 1174px #fff, 1603px 312px #fff, 1626px 1422px #fff, 1430px 615px #fff, 1958px 1431px #fff, 1946px 1412px #fff, 1848px 247px #fff, 984px 1808px #fff, 1396px 225px #fff, 319px 717px #fff, 1252px 875px #fff, 1619px 156px #fff, 951px 1971px #fff, 386px 355px #fff, 1406px 1151px #fff, 273px 1538px #fff, 844px 1570px #fff, 947px 151px #fff, 1363px 525px #fff, 209px 307px #fff, 1923px 1718px #fff, 993px 1741px #fff, 1513px 353px #fff, 1353px 61px #fff, 664px 352px #fff, 1382px 359px #fff, 1487px 1707px #fff, 657px 1045px #fff, 1107px 490px #fff, 1834px 1176px #fff, 837px 1438px #fff, 1947px 448px #fff, 1196px 333px #fff, 151px 555px #fff, 18px 992px #fff, 458px 748px #fff, 1801px 890px #fff, 1093px 1012px #fff, 315px 1101px #fff, 194px 323px #fff, 754px 292px #fff, 1737px 7px #fff, 40px 840px #fff, 1170px 805px #fff, 176px 1753px #fff, 805px 1148px #fff, 1578px 1271px #fff, 367px 1494px #fff, 363px 1111px #fff, 1955px 243px #fff, 1451px 1093px #fff, 375px 617px #fff, 1223px 720px #fff, 1178px 13px #fff, 1456px 865px #fff, 1440px 49px #fff, 186px 1569px #fff, 320px 1853px #fff, 300px 539px #fff, 1559px 509px #fff, 1985px 1108px #fff, 1588px 828px #fff, 525px 1432px #fff, 831px 363px #fff, 141px 281px #fff, 1319px 402px #fff, 40px 456px #fff, 1955px 478px #fff, 1758px 818px #fff, 1924px 688px #fff, 1030px 953px #fff, 1982px 210px #fff, 917px 1401px #fff, 1051px 1837px #fff, 1045px 463px #fff, 1744px 573px #fff, 529px 1530px #fff, 542px 469px #fff, 1982px 324px #fff, 1902px 1422px #fff, 1968px 782px #fff, 1666px 1561px #fff, 955px 304px #fff, 323px 778px #fff, 272px 443px #fff, 485px 581px #fff, 1353px 1058px #fff, 1257px 131px #fff, 434px 98px #fff, 1587px 1953px #fff, 1749px 68px #fff, 1984px 839px #fff, 1518px 183px #fff, 1071px 855px #fff, 1662px 1994px #fff, 1111px 106px #fff, 1954px 838px #fff;
      }
      .active-game-sky #stars2 {
        width: 2px; height: 2px; background: transparent;
        box-shadow: 1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff, 1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff, 1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff, 804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff, 820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff, 1286px 522px #fff, 955px 659px #fff, 428px 1805px #fff, 237px 557px #fff, 1689px 1058px #fff, 636px 1882px #fff, 1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff, 302px 252px #fff, 827px 1765px #fff, 620px 123px #fff, 207px 748px #fff, 1454px 1234px #fff, 1967px 1790px #fff, 542px 33px #fff, 742px 1214px #fff, 255px 1402px #fff, 74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff, 534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff, 1796px 120px #fff, 1409px 1263px #fff, 1627px 995px #fff, 969px 710px #fff, 1674px 676px #fff, 1832px 759px #fff, 1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff, 886px 239px #fff, 778px 150px #fff, 1767px 430px #fff, 765px 1259px #fff, 1189px 877px #fff, 444px 1629px #fff, 1560px 324px #fff, 1952px 1097px #fff, 712px 1173px #fff, 541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff, 784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff, 1821px 174px #fff, 221px 1795px #fff, 1004px 456px #fff, 1298px 941px #fff, 274px 387px #fff, 174px 376px #fff, 1491px 258px #fff, 1489px 1946px #fff, 1134px 1382px #fff, 1289px 1145px #fff, 464px 358px #fff, 1249px 1842px #fff, 1665px 831px #fff, 1982px 84px #fff, 541px 774px #fff, 1994px 523px #fff, 762px 1644px #fff, 1730px 867px #fff, 1951px 1287px #fff, 911px 1691px #fff, 1454px 725px #fff, 1287px 1940px #fff, 70px 564px #fff, 1980px 638px #fff, 1674px 1774px #fff, 1720px 116px #fff, 1747px 182px #fff, 1040px 450px #fff, 1795px 375px #fff, 857px 1471px #fff, 1326px 1730px #fff, 915px 274px #fff, 1224px 358px #fff, 1808px 60px #fff, 43px 1870px #fff, 1810px 1536px #fff, 1564px 1719px #fff, 731px 1388px #fff, 1953px 1967px #fff, 1744px 1119px #fff, 794px 1384px #fff, 959px 714px #fff, 18px 1932px #fff, 1358px 1437px #fff, 355px 939px #fff, 1355px 1648px #fff, 608px 719px #fff, 383px 758px #fff, 1164px 1681px #fff, 1045px 253px #fff, 424px 1279px #fff, 1899px 359px #fff, 379px 488px #fff, 214px 465px #fff, 179px 905px #fff, 830px 1993px #fff, 448px 1077px #fff, 1880px 1354px #fff, 1973px 347px #fff, 745px 1025px #fff, 788px 1007px #fff, 1377px 883px #fff, 6px 290px #fff, 1312px 407px #fff, 1398px 622px #fff, 1405px 339px #fff, 1198px 1709px #fff, 988px 1226px #fff, 87px 1459px #fff, 1113px 1698px #fff, 997px 732px #fff, 708px 331px #fff, 1876px 1112px #fff, 1729px 1797px #fff, 719px 703px #fff, 1295px 522px #fff, 758px 1061px #fff, 1309px 1014px #fff, 1327px 1365px #fff, 854px 1317px #fff, 531px 1001px #fff, 1751px 1040px #fff, 1354px 190px #fff, 800px 1538px #fff, 88px 1455px #fff, 668px 39px #fff, 1379px 41px #fff, 892px 524px #fff, 54px 649px #fff, 1289px 730px #fff, 727px 488px #fff, 181px 842px #fff, 1230px 64px #fff, 3px 857px #fff, 292px 1201px #fff, 1343px 673px #fff, 1096px 1412px #fff, 1520px 292px #fff, 104px 1683px #fff, 934px 1387px #fff, 314px 739px #fff;
        animation: animStar 100s linear infinite;
      }
      .active-game-sky #stars2:after {
        content: " "; position: absolute; top: 2000px; width: 2px; height: 2px; background: transparent;
        box-shadow: 1925px 1320px #fff, 693px 1778px #fff, 1016px 711px #fff, 1171px 563px #fff, 661px 1919px #fff, 1610px 44px #fff, 1275px 140px #fff, 1208px 1802px #fff, 1473px 1587px #fff, 11px 1117px #fff, 853px 1757px #fff, 1149px 937px #fff, 1353px 428px #fff, 270px 279px #fff, 258px 1404px #fff, 417px 1188px #fff, 286px 561px #fff, 393px 1765px #fff, 147px 881px #fff, 666px 1097px #fff, 1425px 1278px #fff, 806px 156px #fff, 1252px 561px #fff, 218px 52px #fff, 1371px 1980px #fff, 171px 745px #fff, 1424px 89px #fff, 137px 244px #fff, 939px 1922px #fff, 137px 1080px #fff, 1757px 50px #fff, 904px 536px #fff, 1938px 1001px #fff, 1172px 440px #fff, 72px 1475px #fff, 102px 121px #fff, 804px 1671px #fff, 1314px 270px #fff, 440px 1341px #fff, 1216px 511px #fff, 1061px 1523px #fff, 97px 274px #fff, 704px 1318px #fff, 52px 1872px #fff, 1962px 296px #fff, 111px 289px #fff, 1157px 1236px #fff, 1347px 1451px #fff, 820px 286px #fff, 1389px 1169px #fff, 644px 841px #fff, 1286px 522px #fff, 955px 659px #fff, 428px 1805px #fff, 237px 557px #fff, 1689px 1058px #fff, 636px 1882px #fff, 1349px 1664px #fff, 1548px 432px #fff, 1841px 504px #fff, 302px 252px #fff, 827px 1765px #fff, 620px 123px #fff, 207px 748px #fff, 1454px 1234px #fff, 1967px 1790px #fff, 542px 33px #fff, 742px 1214px #fff, 255px 1402px #fff, 74px 1772px #fff, 699px 475px #fff, 980px 1253px #fff, 534px 1676px #fff, 909px 202px #fff, 1498px 1251px #fff, 1796px 120px #fff, 1409px 1263px #fff, 1627px 995px #fff, 969px 710px #fff, 1674px 676px #fff, 1832px 759px #fff, 1623px 563px #fff, 251px 1790px #fff, 96px 1688px #fff, 886px 239px #fff, 778px 150px #fff, 1767px 430px #fff, 765px 1259px #fff, 1189px 877px #fff, 444px 1629px #fff, 1560px 324px #fff, 1952px 1097px #fff, 712px 1173px #fff, 541px 911px #fff, 827px 1420px #fff, 1233px 285px #fff, 784px 546px #fff, 645px 285px #fff, 1273px 1255px #fff, 1821px 174px #fff, 221px 1795px #fff, 1004px 456px #fff, 1298px 941px #fff, 274px 387px #fff, 174px 376px #fff, 1491px 258px #fff, 1489px 1946px #fff, 1134px 1382px #fff, 1289px 1145px #fff, 464px 358px #fff, 1249px 1842px #fff, 1665px 831px #fff, 1982px 84px #fff, 541px 774px #fff, 1994px 523px #fff, 762px 1644px #fff, 1730px 867px #fff, 1951px 1287px #fff, 911px 1691px #fff, 1454px 725px #fff, 1287px 1940px #fff, 70px 564px #fff, 1980px 638px #fff, 1674px 1774px #fff, 1720px 116px #fff, 1747px 182px #fff, 1040px 450px #fff, 1795px 375px #fff, 857px 1471px #fff, 1326px 1730px #fff, 915px 274px #fff, 1224px 358px #fff, 1808px 60px #fff, 43px 1870px #fff, 1810px 1536px #fff, 1564px 1719px #fff, 731px 1388px #fff, 1953px 1967px #fff, 1744px 1119px #fff, 794px 1384px #fff, 959px 714px #fff, 18px 1932px #fff, 1358px 1437px #fff, 355px 939px #fff, 1355px 1648px #fff, 608px 719px #fff, 383px 758px #fff, 1164px 1681px #fff, 1045px 253px #fff, 424px 1279px #fff, 1899px 359px #fff, 379px 488px #fff, 214px 465px #fff, 179px 905px #fff, 830px 1993px #fff, 448px 1077px #fff, 1880px 1354px #fff, 1973px 347px #fff, 745px 1025px #fff, 788px 1007px #fff, 1377px 883px #fff, 6px 290px #fff, 1312px 407px #fff, 1398px 622px #fff, 1405px 339px #fff, 1198px 1709px #fff, 988px 1226px #fff, 87px 1459px #fff, 1113px 1698px #fff, 997px 732px #fff, 708px 331px #fff, 1876px 1112px #fff, 1729px 1797px #fff, 719px 703px #fff, 1295px 522px #fff, 758px 1061px #fff, 1309px 1014px #fff, 1327px 1365px #fff, 854px 1317px #fff, 531px 1001px #fff, 1751px 1040px #fff, 1354px 190px #fff, 800px 1538px #fff, 88px 1455px #fff, 668px 39px #fff, 1379px 41px #fff, 892px 524px #fff, 54px 649px #fff, 1289px 730px #fff, 727px 488px #fff, 181px 842px #fff, 1230px 64px #fff, 3px 857px #fff, 292px 1201px #fff, 1343px 673px #fff, 1096px 1412px #fff, 1520px 292px #fff, 104px 1683px #fff, 934px 1387px #fff, 314px 739px #fff;
      }
      .active-game-sky #stars3 {
        width: 3px; height: 3px; background: transparent;
        box-shadow: 200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff, 1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff, 1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff, 811px 977px #fff, 1931px 673px #fff, 1734px 978px #fff, 1772px 1567px #fff, 1197px 1400px #fff, 764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff, 1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff, 235px 1082px #fff, 299px 1086px #fff, 1017px 1602px #fff, 1950px 626px #fff, 1306px 132px #fff, 1358px 1618px #fff, 1873px 1718px #fff, 1447px 940px #fff, 1888px 1195px #fff, 1704px 1765px #fff, 872px 1357px #fff, 1555px 1120px #fff, 250px 1415px #fff, 450px 415px #fff, 492px 901px #fff, 170px 1641px #fff, 56px 1129px #fff, 627px 1514px #fff, 1221px 500px #fff, 324px 1895px #fff, 1397px 1775px #fff, 1966px 598px #fff, 1550px 763px #fff, 326px 1605px #fff, 261px 969px #fff, 890px 281px #fff, 736px 544px #fff, 589px 1262px #fff, 1581px 368px #fff, 1900px 1132px #fff, 1914px 585px #fff, 1864px 1517px #fff, 241px 217px #fff, 859px 787px #fff, 996px 1729px #fff, 741px 121px #fff, 418px 414px #fff, 142px 967px #fff, 387px 896px #fff, 703px 562px #fff, 968px 1136px #fff, 1682px 332px #fff, 1287px 846px #fff, 256px 1427px #fff, 1885px 432px #fff, 1739px 1458px #fff, 345px 1769px #fff, 1140px 1612px #fff, 192px 1921px #fff, 920px 471px #fff, 834px 881px #fff, 917px 1803px #fff, 466px 1266px #fff, 483px 1108px #fff, 689px 986px #fff, 1279px 786px #fff, 458px 910px #fff, 1250px 870px #fff, 785px 1654px #fff, 1543px 1757px #fff, 287px 1272px #fff;
        animation: animStar 150s linear infinite;
      }
      .active-game-sky #stars3:after {
        content: " "; position: absolute; top: 2000px; width: 3px; height: 3px; background: transparent;
        box-shadow: 200px 981px #fff, 1731px 521px #fff, 132px 1039px #fff, 1888px 1547px #fff, 899px 1226px #fff, 1887px 580px #fff, 1548px 1092px #fff, 1626px 689px #fff, 254px 1072px #fff, 1684px 1211px #fff, 672px 1267px #fff, 939px 668px #fff, 1969px 645px #fff, 1126px 983px #fff, 457px 568px #fff, 476px 876px #fff, 829px 1896px #fff, 1364px 1846px #fff, 1507px 1120px #fff, 936px 1948px #fff, 1833px 832px #fff, 1424px 285px #fff, 1377px 1596px #fff, 432px 153px #fff, 1348px 1410px #fff, 1529px 954px #fff, 1102px 387px #fff, 264px 297px #fff, 811px 977px #fff, 1931px 673px #fff, 1734px 978px #fff, 1772px 1567px #fff, 1197px 1400px #fff, 764px 282px #fff, 1103px 822px #fff, 872px 1803px #fff, 1057px 1763px #fff, 52px 1299px #fff, 1312px 1236px #fff, 235px 1082px #fff, 299px 1086px #fff, 1017px 1602px #fff, 1950px 626px #fff, 1306px 132px #fff, 1358px 1618px #fff, 1873px 1718px #fff, 1447px 940px #fff, 1888px 1195px #fff, 1704px 1765px #fff, 872px 1357px #fff, 1555px 1120px #fff, 250px 1415px #fff, 450px 415px #fff, 492px 901px #fff, 170px 1641px #fff, 56px 1129px #fff, 627px 1514px #fff, 1221px 500px #fff, 324px 1895px #fff, 1397px 1775px #fff, 1966px 598px #fff, 1550px 763px #fff, 326px 1605px #fff, 261px 969px #fff, 890px 281px #fff, 736px 544px #fff, 589px 1262px #fff, 1581px 368px #fff, 1900px 1132px #fff, 1914px 585px #fff, 1864px 1517px #fff, 241px 217px #fff, 859px 787px #fff, 996px 1729px #fff, 741px 121px #fff, 418px 414px #fff, 142px 967px #fff, 387px 896px #fff, 703px 562px #fff, 968px 1136px #fff, 1682px 332px #fff, 1287px 846px #fff, 256px 1427px #fff, 1885px 432px #fff, 1739px 1458px #fff, 345px 1769px #fff, 1140px 1612px #fff, 192px 1921px #fff, 920px 471px #fff, 834px 881px #fff, 917px 1803px #fff, 466px 1266px #fff, 483px 1108px #fff, 689px 986px #fff, 1279px 786px #fff, 458px 910px #fff, 1250px 870px #fff, 785px 1654px #fff, 1543px 1757px #fff, 287px 1272px #fff;
      }
    `}</style>
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
  </div>
);

// ==============================================
// 3. GLOBAL STYLES
// ==============================================
const GlobalStyles = () => (
  <style>{`
    /* FAQ Button Jello Effect */
    @keyframes jello-vertical { 0% { transform: scale3d(1, 1, 1); } 30% { transform: scale3d(0.75, 1.25, 1); } 40% { transform: scale3d(1.25, 0.75, 1); } 50% { transform: scale3d(0.85, 1.15, 1); } 65% { transform: scale3d(1.05, 0.95, 1); } 75% { transform: scale3d(0.95, 1.05, 1); } 100% { transform: scale3d(1, 1, 1); } }
    .animate-jello-vertical { animation: jello-vertical 0.7s both; }

    /* ====================================================
       NEW: RULE CARD CSS (Blob Design with Pixel Trajectory Fix)
       ==================================================== */
    .rule-card {
      position: relative;
      width: 320px;
      height: 420px;
      border-radius: 14px;
      z-index: 1111;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 15px 50px rgba(0,0,0,0.5); 
    }

    .rule-bg {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 310px;
      height: 410px;
      z-index: 2;
      background: rgba(255, 255, 255, .95);
      backdrop-filter: blur(24px);
      border-radius: 10px;
      overflow: hidden;
      outline: 2px solid white;
    }

    .rule-blob {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      background-color: #ff0000;
      opacity: 1;
      filter: blur(20px);
      animation: blob-bounce 5s infinite ease;
    }

    .rule-content {
      position: relative;
      z-index: 3;
      padding: 30px;
      color: #333; 
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-size: 14px;
      line-height: 1.5;
    }

    .rule-heading {
      font-size: 24px;
      text-transform: uppercase;
      font-weight: 900;
      color: #ff0000; 
      text-align: center;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }

    /* Fixed Pixel Trajectory to perfectly outline the 320x420 card */
    @keyframes blob-bounce {
      0%   { transform: translate(-50px, -50px); } 
      25%  { transform: translate(120px, -50px); } 
      50%  { transform: translate(120px, 220px); } 
      75%  { transform: translate(-50px, 220px); } 
      100% { transform: translate(-50px, -50px); } 
    }

    /* Shine Text CSS */
    .shine-text { color: rgba(255, 255, 255, 0.3); background: #222 -webkit-gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff)) 0 0 no-repeat; background-image: -webkit-linear-gradient(-40deg, transparent 0%, transparent 40%, #fff 50%, transparent 60%, transparent 100%); -webkit-background-clip: text; -webkit-background-size: 50px; -webkit-animation: zezzz 5s infinite; }
    @-webkit-keyframes zezzz { 0%, 10% { background-position: -200px; } 20% { background-position: top left; } 100% { background-position: 200px; } }

    /* EXACT LAKSHAY-ART PODA INPUT CSS */
    .poda { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; max-width: 314px; margin: 0 auto; z-index: 10; }
    .poda-input { background-color: #010201; border: none; width: 100%; height: 56px; border-radius: 10px; color: white; padding-inline: 59px; font-size: 16px; font-weight: bold; }
    .poda-input::placeholder { color: #5a545a; font-weight: normal; }
    .poda-input:focus { outline: none; }
    .poda-main { position: relative; width: 100%; }
    .poda-main:focus-within > .poda-input-mask { display: none; }
    .poda-input-mask { pointer-events: none; width: 100px; height: 20px; position: absolute; background: linear-gradient(90deg, transparent, #010201); top: 18px; left: 70px; }
    .poda-pink-mask { pointer-events: none; width: 30px; height: 20px; position: absolute; background: #cf30aa; top: 10px; left: 5px; filter: blur(20px); opacity: 0.8; transition: all 2s; }
    .poda-main:hover > .poda-pink-mask { opacity: 0; }
    .poda-white, .poda-border, .poda-darkBorderBg, .poda-glow { max-height: 70px; max-width: 314px; height: 100%; width: 100%; position: absolute; overflow: hidden; z-index: -1; border-radius: 12px; filter: blur(3px); }
    .poda-white { max-height: 63px; max-width: 307px; border-radius: 10px; filter: blur(2px); }
    .poda-white::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(83deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.4); background-image: conic-gradient(rgba(0,0,0,0) 0%, #a099d8, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 50%, #dfa2da, rgba(0,0,0,0) 58%); transition: all 2s; }
    .poda-border { max-height: 59px; max-width: 303px; border-radius: 11px; filter: blur(0.5px); }
    .poda-border::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(70deg); position: absolute; width: 600px; height: 600px; filter: brightness(1.3); background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#1c191c, #402fb5 5%, #1c191c 14%, #1c191c 50%, #cf30aa 60%, #1c191c 64%); transition: all 2s; }
    .poda-darkBorderBg { max-height: 65px; max-width: 312px; }
    .poda-darkBorderBg::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(82deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(rgba(0,0,0,0), #18116a, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 50%, #6e1b60, rgba(0,0,0,0) 60%); transition: all 2s; }
    .poda-glow { overflow: hidden; filter: blur(30px); opacity: 0.4; max-height: 130px; max-width: 354px; }
    .poda-glow::before { content: ""; z-index: -2; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(60deg); position: absolute; width: 999px; height: 999px; background-repeat: no-repeat; background-position: 0 0; background-image: conic-gradient(#000, #402fb5 5%, #000 38%, #000 50%, #cf30aa 60%, #000 87%); transition: all 2s; }
    .poda:hover .poda-darkBorderBg::before { transform: translate(-50%, -50%) rotate(262deg); }
    .poda:hover .poda-glow::before { transform: translate(-50%, -50%) rotate(240deg); }
    .poda:hover .poda-white::before { transform: translate(-50%, -50%) rotate(263deg); }
    .poda:hover .poda-border::before { transform: translate(-50%, -50%) rotate(250deg); }
    .poda:focus-within .poda-darkBorderBg::before { transform: translate(-50%, -50%) rotate(442deg); transition: all 4s; }
    .poda:focus-within .poda-glow::before { transform: translate(-50%, -50%) rotate(420deg); transition: all 4s; }
    .poda:focus-within .poda-white::before { transform: translate(-50%, -50%) rotate(443deg); transition: all 4s; }
    .poda:focus-within .poda-border::before { transform: translate(-50%, -50%) rotate(430deg); transition: all 4s; }
    .poda-add-btn { position: absolute; top: 8px; right: 8px; display: flex; align-items: center; justify-content: center; z-index: 2; max-height: 40px; max-width: 38px; height: 100%; width: 100%; isolation: isolate; overflow: hidden; border-radius: 10px; background: linear-gradient(180deg, #161329, black, #1d1b4b); border: 1px solid transparent; cursor: pointer; }
    .poda-add-btn:active { transform: scale(0.95); }
    .poda-filterBorder { height: 42px; width: 40px; position: absolute; overflow: hidden; top: 7px; right: 7px; border-radius: 10px; pointer-events: none; }
    .poda-filterBorder::before { content: ""; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg); position: absolute; width: 600px; height: 600px; background-repeat: no-repeat; background-position: 0 0; filter: brightness(1.35); background-image: conic-gradient(rgba(0,0,0,0), #3d3a4f, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 50%, #3d3a4f, rgba(0,0,0,0) 100%); animation: p-rotate 4s linear infinite; }
    .poda-search-icon { position: absolute; left: 20px; top: 15px; pointer-events: none; }
    @keyframes p-rotate { 100% { transform: translate(-50%, -50%) rotate(450deg); } }

    /* Day/Night Theme Switch CSS */
    .theme-switch {
      --toggle-size: 8px;
      --container-width: 5.625em;
      --container-height: 2.5em;
      --container-radius: 6.25em;
      --container-light-bg: #3D7EAE;
      --container-night-bg: #1D1F2C;
      --circle-container-diameter: 3.375em;
      --sun-moon-diameter: 2.125em;
      --sun-bg: #ECCA2F;
      --moon-bg: #C4C9D1;
      --spot-color: #959DB1;
      --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
      --stars-color: #fff;
      --clouds-color: #F3FDFF;
      --back-clouds-color: #AACADF;
      --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
      --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
      box-sizing: border-box;
      font-size: var(--toggle-size);
      display: block;
      cursor: pointer;
    }
    .theme-switch *, .theme-switch *::before, .theme-switch *::after { box-sizing: border-box; margin: 0; padding: 0; font-size: var(--toggle-size); }
    .theme-switch__container { width: var(--container-width); height: var(--container-height); background-color: var(--container-light-bg); border-radius: var(--container-radius); overflow: hidden; cursor: pointer; box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94); transition: var(--transition); position: relative; }
    .theme-switch__container::before { content: ""; position: absolute; z-index: 1; inset: 0; box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset; border-radius: var(--container-radius); }
    .theme-switch__checkbox { display: none; }
    .theme-switch__circle-container { width: var(--circle-container-diameter); height: var(--circle-container-diameter); background-color: rgba(255, 255, 255, 0.1); position: absolute; left: var(--circle-container-offset); top: var(--circle-container-offset); border-radius: var(--container-radius); box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1); display: flex; transition: var(--circle-transition); pointer-events: none; }
    .theme-switch__sun-moon-container { pointer-events: auto; position: relative; z-index: 2; width: var(--sun-moon-diameter); height: var(--sun-moon-diameter); margin: auto; border-radius: var(--container-radius); background-color: var(--sun-bg); box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset; filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25)); overflow: hidden; transition: var(--transition); }
    .theme-switch__moon { transform: translateX(100%); width: 100%; height: 100%; background-color: var(--moon-bg); border-radius: inherit; box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset; transition: var(--transition); position: relative; }
    .theme-switch__spot { position: absolute; top: 0.75em; left: 0.312em; width: 0.75em; height: 0.75em; border-radius: var(--container-radius); background-color: var(--spot-color); box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset; }
    .theme-switch__spot:nth-of-type(2) { width: 0.375em; height: 0.375em; top: 0.937em; left: 1.375em; }
    .theme-switch__spot:nth-last-of-type(3) { width: 0.25em; height: 0.25em; top: 0.312em; left: 0.812em; }
    .theme-switch__clouds { width: 1.25em; height: 1.25em; background-color: var(--clouds-color); border-radius: var(--container-radius); position: absolute; bottom: -0.625em; left: 0.312em; box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color); transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25); }
    .theme-switch__stars-container { position: absolute; color: var(--stars-color); top: -100%; left: 0.312em; width: 2.75em; height: auto; transition: var(--transition); }
    
    .theme-switch__checkbox:checked + .theme-switch__container { background-color: var(--container-night-bg); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container { left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter)); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover { left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em) }
    .theme-switch__circle-container:hover { left: calc(var(--circle-container-offset) + 0.187em); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon { transform: translate(0); }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds { bottom: -4.062em; }
    .theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container { top: 50%; transform: translateY(-50%); }

    /* CEVOROB BURGER MENU CSS (Scaled to 50% size) */
    .burger {
      position: relative;
      width: 40px;
      height: 30px;
      background: transparent;
      cursor: pointer;
      display: block;
      z-index: 60;
      -webkit-tap-highlight-color: transparent;
      transform: scale(0.5); 
      transform-origin: top left;
    }
    .burger input { display: none; }
    .burger span {
      display: block;
      position: absolute;
      height: 4px;
      width: 100%;
      background: white; 
      border-radius: 9px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .25s ease-in-out;
      box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
    .burger span:nth-of-type(1) { top: 0px; transform-origin: left center; }
    .burger span:nth-of-type(2) { top: 50%; transform: translateY(-50%); transform-origin: left center; }
    .burger span:nth-of-type(3) { top: 100%; transform-origin: left center; transform: translateY(-100%); }
    .burger input:checked ~ span:nth-of-type(1) { transform: rotate(45deg); top: 0px; left: 5px; }
    .burger input:checked ~ span:nth-of-type(2) { width: 0%; opacity: 0; }
    .burger input:checked ~ span:nth-of-type(3) { transform: rotate(-45deg); top: 28px; left: 5px; }

    /* STEALTHWORM BUTTON CSS (Start Match Only) */
    .stealth-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: hidden;
      height: 4rem;
      background-size: 300% 300%;
      cursor: pointer;
      backdrop-filter: blur(1rem);
      border-radius: 5rem;
      transition: 0.5s;
      animation: stealth_gradient_301 5s ease infinite;
      border: double 4px transparent;
      background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #fe53bb 45%, #8f51ea 67%, #0044ff 87%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .stealth-btn:disabled { opacity: 0.5; pointer-events: none; filter: grayscale(1); }
    .stealth-container-stars { position: absolute; z-index: -1; width: 100%; height: 100%; overflow: hidden; transition: 0.5s; backdrop-filter: blur(1rem); border-radius: 5rem; }
    .stealth-strong { z-index: 2; font-size: 1.125rem; font-weight: 900; letter-spacing: 0.2em; color: #ffffff; text-shadow: 0 0 4px white; text-transform: uppercase; }
    .stealth-glow { position: absolute; display: flex; width: 12rem; }
    .stealth-circle { width: 100%; height: 30px; filter: blur(2rem); animation: stealth_pulse_3011 4s infinite; z-index: -1; }
    .stealth-circle:nth-of-type(1) { background: rgba(254, 83, 186, 0.636); }
    .stealth-circle:nth-of-type(2) { background: rgba(142, 81, 234, 0.704); }
    .stealth-btn:hover .stealth-container-stars { z-index: 1; background-color: #212121; }
    .stealth-btn:hover { transform: scale(1.05); }
    .stealth-btn:active { border: double 4px #fe53bb; background-origin: border-box; background-clip: content-box, border-box; animation: none; transform: scale(0.95); }
    .stealth-btn:active .stealth-circle { background: #fe53bb; }
    .stealth-stars { position: relative; background: transparent; width: 200rem; height: 200rem; }
    .stealth-stars::after { content: ""; position: absolute; top: -10rem; left: -100rem; width: 100%; height: 100%; animation: stealth_animStarRotate 90s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; }
    .stealth-stars::before { content: ""; position: absolute; top: 0; left: -50%; width: 170%; height: 500%; animation: stealth_animStar 60s linear infinite; background-image: radial-gradient(#ffffff 1px, transparent 1%); background-size: 50px 50px; opacity: 0.5; }
    @keyframes stealth_animStar { from { transform: translateY(0); } to { transform: translateY(-135rem); } }
    @keyframes stealth_animStarRotate { from { transform: rotate(360deg); } to { transform: rotate(0); } }
    @keyframes stealth_gradient_301 { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes stealth_pulse_3011 { 0% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); } 100% { transform: scale(0.75); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); } }

    /* NEW: BARISDOGANSUTCU SVG BUTTON (Hide & Proceed Only) */
    .play-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 0 10px;
      color: white;
      text-shadow: 2px 2px rgb(116, 116, 116);
      text-transform: uppercase;
      cursor: pointer;
      border: solid 2px black;
      letter-spacing: 1px;
      font-weight: 600;
      font-size: 17px;
      background-color: hsl(49deg 98% 60%);
      border-radius: 50px;
      position: relative;
      overflow: hidden;
      transition: all 0.5s ease;
      margin-top: 1rem;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .play-btn:disabled {
      opacity: 0;
      pointer-events: none;
    }

    .play-btn:active {
      transform: scale(0.9);
      transition: all 100ms ease;
    }

    .play-btn svg {
      transition: all 0.5s ease;
      z-index: 2;
    }

    .play-btn-play {
      transition: all 0.5s ease;
      transition-delay: 300ms;
    }

    .play-btn:hover svg, .play-btn:active svg {
      transform: scale(3) translate(50%);
    }

    .play-btn-now {
      position: absolute;
      left: 0;
      transform: translateX(-100%);
      transition: all 0.5s ease;
      z-index: 2;
    }

    .play-btn:hover .play-btn-now, .play-btn:active .play-btn-now {
      transform: translateX(10px); 
      transition-delay: 300ms;
    }

    .play-btn:hover .play-btn-play, .play-btn:active .play-btn-play {
      transform: translateX(200%);
      transition-delay: 300ms;
    }
  `}</style>
);

// ==============================================
// 4. GAME COMPONENTS
// ==============================================
const FlipCard = ({ isFlipped, status }) => {
  return (
    <div className="my-6 relative w-[190px] h-[254px] [perspective:1000px] font-sans">
      <div 
        className="relative w-full h-full text-center transition-transform duration-[800ms] [transform-style:preserve-3d]"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden] border border-[coral] rounded-2xl shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
          style={{ background: 'linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%)', color: 'coral' }}
        >
          <p className="text-2xl font-black tracking-widest m-0 uppercase">THE DECK</p>
          <p className="mt-2 font-bold tracking-[0.2em] text-[10px] uppercase opacity-80">
            {isFlipped ? 'Revealing...' : 'Hold to View'}
          </p>
        </div>

        <div 
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full [backface-visibility:hidden] rounded-2xl shadow-[0_8px_14px_0_rgba(0,0,0,0.2)]"
          style={{ 
            transform: 'rotateY(180deg)',
            background: status === 'SAFE' 
              ? 'linear-gradient(120deg, #d1fae5 30%, #10b981 88%, #ecfdf5 40%, #6ee7b7 78%)'
              : 'linear-gradient(120deg, #ffe4e6 30%, #e11d48 88%, #fff1f2 40%, #fda4af 78%)',
            border: status === 'SAFE' ? '1px solid #10b981' : '1px solid #e11d48',
            color: 'white'
          }}
        >
          <p className="text-3xl font-black tracking-widest m-0 drop-shadow-md">
            {status === 'SAFE' ? 'SAFE' : 'ELIMINATE'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function GameBoard() {
  const { 
    phase, players, winStreak, initialRoster, recentNames,
    startGame, goToChoicePhase, makeChoice, nextRound, addPlayer, removePlayer, cardStatus, roundResult,
    playAgain, backToLobby
  } = useGameStore();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [isHoldingCard, setIsHoldingCard] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);
  
  // Rule Modal Controls & Theme Controls
  const [showRules, setShowRules] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);

  useEffect(() => {
    if (phase === 'peek') setHasPeeked(false);
  }, [phase]);

  // Original instant handler for fast UI actions (Add/Remove players, Rules)
  const handleAction = (actionCallback, soundEffect = sfx.tap) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) actionCallback();
  };

  // --- DELAYED ACTION FOR MAJOR PAGE TRANSITIONS ---
  const handleDelayedAction = (actionCallback, soundEffect = sfx.tap, delayMs = 250) => {
    sfx.init();
    if (soundEffect) soundEffect.bind(sfx)();
    if (actionCallback) {
      setTimeout(() => {
        actionCallback();
      }, delayMs); 
    }
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      handleAction(() => addPlayer(newPlayerName.trim()), sfx.addPlayer);
      setNewPlayerName('');
    }
  };

  const onHoldStart = (e) => {
    if (e.cancelable) e.preventDefault(); 
    sfx.init();
    sfx.tap();
    setIsHoldingCard(true);
    setHasPeeked(true);
  };

  const onHoldEnd = (e) => {
    if (e.cancelable) e.preventDefault();
    if (isHoldingCard) sfx.tap(); 
    setIsHoldingCard(false);
  };

  const availableRecentNames = recentNames.filter(n => !players.some(p => p.name === n));

  const displayStreak = roundResult
    ? (roundResult.p1Lost ? 1 : winStreak + 1)
    : winStreak;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-[#FAF9F6] font-sans text-slate-800 select-none overflow-x-hidden w-full">
      
      <GlobalStyles />

      {/* --- NEW: BLOB RULE CARD OVERLAY --- */}
      {showRules && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => handleAction(() => setShowRules(false))} 
        >
          <div className="rule-card" onClick={(e) => e.stopPropagation()}>
            <div className="rule-bg"></div>
            <div className="rule-blob"></div>
            <div className="rule-content">
              <p className="rule-heading">How to Play</p>
              <p><strong>1. PEEK:</strong> Secretly check your card. It's either SAFE or ELIMINATE.</p>
              <p><strong>2. FACE:</strong> Keep a straight poker face and hand the phone over.</p>
              <p><strong>3. FATE:</strong> The Challenger must read your face and choose to TAKE or PASS.</p>
              <p><strong>4. OUT:</strong> Whoever ends up holding the ELIMINATE card loses!</p>
            </div>
          </div>
          <p className="text-center text-white/50 text-xs mt-10 tracking-widest uppercase">Tap background to close</p>
        </div>
      )}

      {/* --- DYNAMIC BACKGROUND HANDLING --- */}
      {phase === 'lobby' ? (
        (isDayMode ? <MorningSky /> : <MidnightSky />)
      ) : (
        <ActiveGameSky />
      )}
      
      {/* --- LOBBY PHASE --- */}
      {phase === 'lobby' && (
        <>
          {/* CEVOROB BURGER BUTTON */}
          <div className="fixed top-6 left-6 z-[60]">
            <label className="burger" htmlFor="burger">
              <input 
                type="checkbox" 
                id="burger" 
                checked={showRules} 
                onChange={() => handleAction(() => setShowRules(!showRules))} 
              />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          {/* DAY/NIGHT TOGGLE SWITCH - TOP RIGHT */}
          <div className="fixed top-6 right-6 z-40 shadow-xl rounded-full">
            <label className="theme-switch" htmlFor="theme-switch-toggle">
              {/* Checked = Night Mode, Unchecked = Day Mode */}
              <input type="checkbox" id="theme-switch-toggle" className="theme-switch__checkbox" checked={!isDayMode} onChange={() => handleAction(() => setIsDayMode(!isDayMode))} />
              <div className="theme-switch__container">
                <div className="theme-switch__clouds"></div>
                <div className="theme-switch__stars-container">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z" fill="currentColor"></path>
                  </svg>
                </div>
                <div className="theme-switch__circle-container">
                  <div className="theme-switch__sun-moon-container">
                    <div className="theme-switch__moon">
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                      <div className="theme-switch__spot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm animate-fade-in py-8 mt-4">
            
            {/* LOBBY TITLE - SHINE EFFECT */}
            <h1 className="shine-text text-4xl font-black tracking-[0.2em] mb-8 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
              The Deck
            </h1>
            
            {/* NEON ANIMATED INPUT */}
            <div className="w-full mb-10 flex justify-center">
              <div className="poda">
                <div className="poda-glow"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-darkBorderBg"></div>
                <div className="poda-white"></div>
                <div className="poda-border"></div>
                <div className="poda-main">
                  <input 
                    placeholder="Enter Name..." 
                    type="text" 
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
                    className="poda-input" 
                  />
                  <div className="poda-input-mask"></div>
                  <div className="poda-pink-mask"></div>
                  <div className="poda-filterBorder"></div>
                  
                  <div className="poda-add-btn" onClick={handleAddPlayer}>
                    <svg preserveAspectRatio="none" height="20" width="20" viewBox="0 0 24 24" fill="none" stroke="#d6d6e6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                  
                  <div className="poda-search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" height="24" fill="none">
                      <path stroke="url(#search)" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle stroke="url(#searchl)" cx="12" cy="7" r="4"></circle>
                      <defs>
                        <linearGradient gradientTransform="rotate(50)" id="search">
                          <stop stopColor="#f8e7f8" offset="0%"></stop>
                          <stop stopColor="#b6a9b7" offset="50%"></stop>
                        </linearGradient>
                        <linearGradient id="searchl">
                          <stop stopColor="#b6a9b7" offset="0%"></stop>
                          <stop stopColor="#837484" offset="50%"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Players List */}
            {availableRecentNames.length > 0 && (
              <div className="w-full mb-6">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-3 pl-2 text-center drop-shadow-md">Recent Players</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {availableRecentNames.slice(0, 6).map(name => (
                    <button 
                      key={name} 
                      onClick={() => handleAction(() => addPlayer(name), sfx.addPlayer)} 
                      className="px-4 py-2 bg-[#222] text-[#e81cff] border border-[#e81cff]/30 rounded-full text-xs font-bold tracking-wider active:scale-95 transition-all shadow-md"
                    >
                      + {name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Added Players List */}
            <div className="w-full space-y-2 mb-10 max-h-[300px] overflow-y-auto px-2">
              {players.map((p) => (
                <div key={p.id} className="flex justify-between items-center py-4 px-6 bg-[#010201]/80 backdrop-blur-md border border-[#40c9ff]/30 rounded-2xl shadow-sm transition-all">
                  <span className="font-bold tracking-widest text-white">{p.name}</span>
                  <button onClick={() => handleAction(() => removePlayer(p.id), sfx.removePlayer)} className="text-rose-500 font-bold active:scale-90 flex items-center justify-center w-6 h-6">✕</button>
                </div>
              ))}
            </div>

            {/* --- STEALTHWORM START MATCH BUTTON --- */}
            <button 
              onClick={() => handleDelayedAction(startGame, sfx.tap, 250)}
              disabled={players.length < 2}
              className="stealth-btn"
            >
              <strong className="stealth-strong">START MATCH</strong>
              <div className="stealth-container-stars">
                <div className="stealth-stars"></div>
              </div>
              <div className="stealth-glow">
                <div className="stealth-circle"></div>
                <div className="stealth-circle"></div>
              </div>
            </button>
          </div>
        </>
      )}

      {/* --- PEEK PHASE --- */}
      {phase === 'peek' && (
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in py-6">
          <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-bold">Current Player</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-slate-800">{players[0]?.name}</h2>

          <div 
            onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onMouseLeave={onHoldEnd}
            onTouchStart={onHoldStart} onTouchEnd={onHoldEnd}
            className="cursor-pointer"
          >
            <FlipCard isFlipped={isHoldingCard} status={cardStatus} />
          </div>

          {/* EXACT SVG PLAY/NOW BUTTON - APPLIED ONLY TO HIDE & PROCEED */}
          <button 
            onClick={() => handleDelayedAction(goToChoicePhase, sfx.tap, 850)}
            disabled={!hasPeeked || isHoldingCard}
            className={`play-btn ${!hasPeeked || isHoldingCard ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36px" height="36px">
              <rect width="36" height="36" x="0" y="0" fill="#fdd835"></rect>
              <path fill="#e53935" d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"></path>
              <path fill="#b71c1c" d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"></path>
              <path fill="#212121" d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"></path>
              <path fill="#01579b" d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"></path>
              <path fill="#212121" d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"></path>
              <path fill="#81d4fa" d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"></path>
              <path fill="#212121" d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"></path>
              <path fill="#e1f5fe" d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"></path>
            </svg>
            <span className="play-btn-now">now!</span>
            <span className="play-btn-play">play</span>
          </button>
        </div>
      )}

      {/* --- CHOICE PHASE --- */}
      {phase === 'choice' && (
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in py-6">
          <p className="text-slate-400 uppercase tracking-widest text-[10px] mb-2 font-bold">Challenger</p>
          <h2 className="text-3xl font-black tracking-widest uppercase text-slate-800 mb-2">{players[1]?.name}</h2>

          <FlipCard isFlipped={false} status={cardStatus} />

          <p className="text-slate-400 tracking-widest uppercase text-[10px] mt-6 mb-3 font-bold">Determine Fate</p>

          <div className="flex w-full max-w-xs gap-4">
            {/* Added 250ms delay to Take Button */}
            <button 
              onClick={() => handleDelayedAction(() => makeChoice('STEAL'), sfx.tap, 250)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/15 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                TAKE
              </span>
            </button>

            {/* Added 250ms delay to Pass Button */}
            <button 
              onClick={() => handleDelayedAction(() => makeChoice('LEAVE'), sfx.tap, 250)}
              className="group relative flex-1 p-0 bg-transparent border-none outline-none touch-manipulation cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-black/15 translate-y-[2px] transition-transform duration-300 group-active:translate-y-[1px] group-active:duration-[34ms]"></span>
              <span className="absolute inset-0 w-full h-full rounded-2xl bg-[#B8E3E9]"></span>
              <span className="block relative py-5 rounded-2xl bg-white border-2 border-[#B8E3E9] text-slate-800 font-black tracking-widest -translate-y-[4px] transition-transform duration-300 group-active:-translate-y-[2px] group-active:duration-[34ms]">
                PASS
              </span>
            </button>
          </div>
        </div>
      )}

      {/* --- RESOLUTION PHASE --- */}
      {phase === 'resolution' && roundResult && (
        <div className="relative z-10 flex flex-col items-center w-full animate-fade-in text-center py-6">
          <FlipCard isFlipped={true} status={cardStatus} />

          <div className="mt-4 mb-6 w-full max-w-xs bg-white border border-slate-100 shadow-sm rounded-2xl py-5">
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest mb-1">{roundResult.loser.name}</h2>
            <p className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px]">Eliminated</p>
            <div className="h-px w-1/3 bg-slate-100 mx-auto my-3"></div>
            <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">
              Win Streak: {displayStreak} / {Math.max(initialRoster.length - 1, 2)}
            </p>
          </div>

          {/* Added 250ms delay to Next Match Button */}
          <button 
            onClick={() => handleDelayedAction(nextRound, sfx.tap, 250)}
            className="w-full max-w-xs py-5 bg-slate-800 text-white rounded-2xl font-black tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
          >
            NEXT MATCH
          </button>
        </div>
      )}

      {/* --- GAMEOVER PHASE --- */}
      {phase === 'gameover' && (
        <div className="relative z-10 flex flex-col items-center animate-fade-in text-center mt-16 w-full">
          
          <button 
            onClick={() => handleDelayedAction(backToLobby, sfx.tap, 250)}
            className="group fixed top-6 right-6 flex items-center justify-center h-10 px-3 bg-white border border-slate-200 shadow-sm rounded-lg text-slate-600 font-bold tracking-widest uppercase text-[10px] active:scale-95 active:-translate-y-1 active:shadow-md transition-all duration-200 z-50"
          >
            <svg className="h-4 w-4 mr-1 transition-transform duration-300 group-active:-translate-x-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
            </svg>
            BACK
          </button>

          <div className="w-20 h-20 bg-[#B8E3E9] shadow-[0_10px_30px_rgba(184,227,233,0.5)] flex items-center justify-center rounded-full text-3xl mb-6">👑</div>
          <h2 className="text-4xl font-black text-slate-800 uppercase tracking-widest mb-4">{players[0]?.name}</h2>
          <p className="text-emerald-500 font-bold tracking-[0.3em] mb-16 uppercase text-xs">Game Champion</p>
          
          {/* Added 250ms delay to Play Again Button */}
          <button 
            onClick={() => handleDelayedAction(playAgain, sfx.tap, 250)}
            className="px-8 py-4 bg-white border-2 border-slate-200 shadow-md rounded-2xl text-slate-800 font-bold tracking-[0.2em] active:bg-slate-50 transition-colors"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}