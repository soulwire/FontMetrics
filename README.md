# FontMetrics

A lightweight JavaScript library for computing accurate font metrics such as __x-height__, __cap height__, __ascent__, __descent__ and __tittle__ for any loaded web font.

## Demo
You can see it in action [here](http://soulwire.github.io/FontMetrics/).

## Installation 

Install via npm

```
npm install fontmetrics
```

Or include [the script](https://github.com/soulwire/FontMetrics/blob/master/output/FontMetrics.min.js) in your page

```
<script src="FontMetrics.min.js" type="text/javascript"></script>
```

## Usage

__Make sure your font is loaded first!__ A good way to do this is by using [WebFontLoader](https://github.com/typekit/webfontloader).

```javascript
// If installed via npm...
import FontMetrics from 'fontmetrics'

const metrics = FontMetrics({
  fontFamily: 'Roboto',
  // Optional (defaults)
  fontWeight: 'normal',
  fontSize: 200,
  origin: 'baseline'
})
```

This will return an object containing values that are normalised to `fontSize` and relative to `origin`, for example:

```javascript
{
  capHeight: -0.73,
  baseline: 0,
  xHeight: -0.54,
  descent: 0.195,
  bottom: 0.5,
  ascent: -0.76,
  tittle: -0.73,
  top: -0.935,
  fontFamily: 'Roboto',
  fontWeight: 'normal',
  fontSize: 200
}
```
## How to use metrics

As mentioned above, the values returned are normalised to `fontSize` and relative to `origin`. This is useful because you should then be able to use the returned values regardless of your display font size, simply by scaling them.

For example, if the value returned for `ascent` is `-0.695` with `origin` set to `'baseline'`, then you can get the pixel value for ascent by using `yourBaselinePosition + metrics.ascent * fontSize`.

## Origin

You will likely need different origins based on how you're wanting to use the metrics. `'baseline`' is the default, but you can pass the name of any metric returned from `FontMetrics` to be used as the origin (e.g. `'top'`.) This will mean that all returned metrics will now be relative to `top` and of course `top` will be `0`.

## Settings

You can define the characters used to test certain metrics via `FontMetrics.settings.chars`. For example, `FontMetrics.settings.chars.xHeight` defines the character used to measure the `xHeight` metric (defaults to `'x'`.)

## How it works

FontMetrics works by rendering your font to a `CanvasRenderingContext2D` and then measuring the pixel bounds of the output. This is a fairly well documented technique and seems to provide pretty decent results.