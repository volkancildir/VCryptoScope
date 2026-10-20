# VCryptoScope Geliştirme Kuralları

## Her geliştirmede zorunlu kontrol

1. **Değişikliğin kapsamını belirle:** Etkilenen HTML sayfalarını, ortak CSS/JS dosyalarını ve sayfaya özel stilleri kontrol et.
2. **Tüm sayfaları doğrula:** Ortak bir bileşen veya tasarım değişikliği yapıldığında yalnızca ana sayfayı değil, ilgili tüm sayfaları kontrol et: `index.html`, `analysis.html`, `news.html`, `backtest.html`, `quant.html` ve değişiklikten etkilenen diğer sayfalar.
3. **Ortak kaynakları ve önbelleği kontrol et:** CSS/JS bağlantılarını, sürüm parametrelerini, yinelenen stilleri ve sayfa içi override'ları incele. Aynı bileşenin sayfalar arasında farklı davranmasına izin verme.
4. **Mobil ve masaüstünü kontrol et:** Dar ekran, geniş ekran, yatay taşma, hizalama, boşluklar, sabit gezinme ve güvenli alan (safe area) davranışlarını değerlendir.
5. **Değişikliğin yan etkilerini kontrol et:** İlgisiz özellikleri, çalışan veri akışlarını, bağlantıları ve mevcut işlevleri bozma.
6. **Yayını doğrula:** Commit'in doğru dala gittiğini, GitHub Actions/deploy durumunu ve yayınlanan sayfanın güncel kodu aldığını kontrol et. Yalnızca commit atılmış olmasını yayının tamamlandığına kanıt sayma.
7. **Dürüst raporla:** Gerçekte kontrol edilmeyen sayfa veya cihazları test edilmiş gibi sunma. Kontrol edilemeyen noktaları açıkça belirt.
8. **Sorun tekrar ederse kök nedeni ara:** Aynı düzeltmeyi tekrar tekrar eklemek yerine eski CSS/JS kurallarını, sayfa farklılıklarını, önbelleği ve yüklenme sırasını incele.

## Mobil arayüz için özel kural

Mobil gezinme butonları ile sayfa içeriği/veri alanı arasındaki boşluklar; üst başlık, sekmeler/filtreler, içerik başlangıcı ve alttaki sabit menü ayrı ayrı kontrol edilerek tutarlı hale getirilmelidir. Bir sayfada yapılan hizalama veya boşluk düzeltmesi, ortak tasarım kullanılıyorsa ilgili bütün sayfalarda doğrulanmalıdır.
