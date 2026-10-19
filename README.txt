VCryptoScope — GitHub Pages dosyaları

- index.html: 1. sayfa Ağaç Haritası (varsayılan açılış), 2. sayfa Coin Listesi (piyasa özeti ve arama/sıralama ile).
- analysis.html: Analiz; coin seçimi, mum grafiği, teknik göstergeler ve birleşik senaryo.
- news.html: Piyasa Haberleri; kripto, Fed/faiz, istihdam/enflasyon, petrol/enerji, regülasyon ve küresel piyasalar.
- manifest.webmanifest / sw.js / icon.svg: Android PWA kurulumu.

GitHub deposundaki mevcut index.html dosyasını bu klasördeki index.html ile değiştirin; analysis.html, manifest.webmanifest, sw.js ve icon.svg dosyalarını da depo ana dizinine ekleyin. Commit sonrası GitHub Pages'i yenileyin.

Veriler CoinGecko Public API ve Binance Spot public API üzerinden alınır. İnternet/API limitleri etkileyebilir. Analiz skorları olasılık veya garanti değildir; giriş/hedef seviyeleri otomatik teknik senaryo tahminidir.


Analiz güncellemesi (19.10.2026): Birleşik skor; Ichimoku, Tenkan/Kijun, EMA 20/50/200, fiyat/EMA20, RSI, MACD, Bollinger, ADX/DMI, OBV ve anormal hacim teyidini ağırlıklı değerlendirir. Gösterge kartları olumluysa yeşil, olumsuzsa kırmızı, karışık/nötrse nötr renkte gösterilir. Giriş bölgeleri pivot destekleri, EMA seviyeleri, Bollinger orta/alt bantları ve Fibonacci geri çekilmeleri arasından seçilir; ikinci bölge birinciden ATR mesafesiyle ayrılır. Bunlar teknik senaryo bölgeleridir, yatırım tavsiyesi veya kesin sinyal değildir.

Likidasyon heatmap güncellemesi (19.10.2026): analysis.html artık SmartMoneyAPI'nin herkese açık /v1/liquidations/simulate uç noktasından ±%8 fiyat hareketi senaryoları alır. Sıcak renkli geniş fiyat bantları, yaklaşık %0,25 fiyat adımlarıyla kümeleri birleştirir. Heatmap tahmini/model verisidir; bireysel hesapların kesin likidasyon fiyatlarını veya gelecekte fiyatın o seviyeye gideceğini göstermez. Açık API'nin hız limiti/CORS erişimi sağlayıcıya bağlıdır. CoinGlass model-heatmap sayfası ayrıca bağlantı olarak bulunur.


Son güncelleme: Likidite paneli Binance Spot /api/v3/depth ile görünen spot limit emirlerini gösterir. Kaldıraçlı likidasyon haritası değildir. Hedef 1 ve Hedef 2, mevcut fiyata göre yüzde mesafeleriyle birlikte özet senaryoda gösterilir.

Ağaç haritası güncellemesi (19.10.2026): index.html ilk açıldığında Ağaç Haritası görünür; üst navigasyonda sırasıyla Ağaç Haritası, Coin Listesi ve Analiz bulunur. Harita Coin360 tarzı treemap görünümüdür; alan piyasa değerine, renk seçilen 1 saat/24 saat/7 gün/1 ay değişimine bağlıdır. Coin kutusuna dokunmak analysis.html sayfasını açar. API bu zaman aralıklarından birini döndürmezse o coin gri görünür; bu renk nötr fiyat hareketi değil, eksik veridir. Bu sürümde harita ve analiz coin listesi ilk 100 coinle sınırlıdır.


Son düzeltme: Ağaç haritasında piyasa değeri alanları 0,38 kuvvetiyle dengelenir; böylece BTC/ETH gibi ilk coinler diğer coinleri aşırı küçültmez. Service worker önbelleği her güncellemede sürüm numarası artırılarak yenilenir; mevcut sürüm v17’dir. Başlık yanındaki logo icon.svg dosyasını kullanır; navigasyon etiketleri numarasızdır ve analiz sayfasından üç sayfaya da geçilebilir.


Navigasyon / GitHub Pages: index.html, analysis.html, manifest.webmanifest, sw.js ve icon.svg dosyalarının hepsi repository ana dizininde (root) olmalıdır. GitHub Pages ayarında yayın kaynağı olarak main branch / root seçin. Sayfalar arası bağlantılar göreli HTML yollarını kullanır; dosyaları başka bir alt klasöre koymayın.

Analiz sayfası güncellemesi: göstergeler ayrı kutular halinde çoklu seçilebilir; Ichimoku, EMA, Bollinger, Fibonacci ve destek/direnç mum grafiğine; RSI, MACD, OBV, ADX/DMI, ATR ve hacim kendi alt grafiklerine eklenir. Yenile butonu seçili coin ve grafikleri günceller.

Kişiselleştirilebilir sayfa düzeni (19.10.2026): Üst menüdeki “⚙️ Sayfa düzeni” düğmesinden Ağaç Haritası, Coin Listesi ve Analiz sayfalarının sırası yukarı/aşağı oklarıyla değiştirilebilir. Aynı panelden uygulama açıldığında gösterilecek sayfa seçilir. Tercihler vcryptoscopePrefsV1 anahtarıyla bu cihazın tarayıcı localStorage alanında saklanır; başka cihazlarda ayrıca ayarlanır. “Varsayılana dön” seçeneği orijinal sırayı ve Ağaç Haritası açılışını geri getirir. Service worker önbellek sürümü v17’dir.


Piyasa Haberleri güncellemesi (19.10.2026): news.html canlı CryptoCompare haber akışı ve Google News RSS aramaları üzerinden kripto, Fed/faiz, istihdam/enflasyon, petrol/enerji, regülasyon ve küresel piyasalar başlıklarını birleştirir. Kategori filtreleri, arama ve 5 dakikada otomatik yenileme vardır. Dış sağlayıcıların CORS, erişim ve hız sınırları nedeniyle bazı kaynaklar geçici olarak çalışmayabilir; her kart orijinal habere bağlanır. Sayfa sıralaması ve açılış tercihi dört sayfayı da kapsar. Service worker önbelleği v18.


HABER AKISI KURULUMU (GEREKLI)
1) .github/workflows/update-news.yml dosyasini GitHub deposunda ayni klasor yoluyla yukle.
2) news.html ve sw.js dosyalarini guncelle; news.json dosyasini depo kokune yukle.
3) GitHub > Actions bolumunde Update market news feed is akisini acip Run workflow secenegine dokun.
4) Is akisi basarili olunca news.json otomatik guncellenir; sayfa artik tarayicidan RSS/CORS proxy istemez. Zamanli yenileme yaklasik 15 dakikada bir calisir (GitHub zamanlamalari gecikebilir).
