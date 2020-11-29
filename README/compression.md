Compression ReadMe
===

Technical Requirements
---
Recorded how to use our app. The file was less than 10mb, or else Github would not render on the README.

Screen Recording Process
---
QuickTime player recorded a small window of Chrome. The window has to be small to reduce file size.

Conversion Process
---
I saved the QuickTime file at the lowest resolution possible in the Export option. Then I converted the .mov file to .gif using the command line ffmpeg:

```
ffmpeg -i a.mov -vf scale=320:-1 -r 10 -f image2pipe -vcodec ppm - | convert -delay .75 -loop 0 - gif:- | convert -layers Optimize - Demonstration-Lt10mb.gif

```

Notice the scale is small. The -1 makes sure to keep aspect ratio. I also set delay to .75 to increase the speed of the screen recording, further reducing file size.


Compression Process
---
I used this tool that compresses with their own algorithm and then the file size went down to below 10mb:
https://www.iloveimg.com/compress-image/compress-gif


Older Considerations
---
The above iteration was a success (small Chrome window, lowest resolution export from Quick Time, ffmpeg speeding up and lowering the scale, and iloveimg compression). I spent some considerable time with other attempts that did not produce the file size Github wanted to render GIF's:

- Recording full monitor screen
- Using iloveimg's crop and resize tools to attempt to lower file size.
- Speeding up the GIF using imagemagick command line tool