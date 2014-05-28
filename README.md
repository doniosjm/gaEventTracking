#gaEventTracking

Google Analytics event tracking using element attributes

##Prerequisite
analytics.js from Google Analytics must be referenced on the page, [https://developers.google.com/analytics/devguides/collection/analyticsjs/events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)

Each element that will trigger a ga() function call must have the following attributes:

- data-analytics-event-category
- data-analytics-event-action
- data-analytics-event-label
- data-analytics-event-type (optional)

##Usage
1) Any DOM element can be setup to trigger an Event Tracking call to the ga() function. For example, an anchor tags would be setup as

```js
<a href="https://github.com/doniosjm/gaEventTracking" id="myLink" class="myClass" data-analytics-event-category="link" data-analytics-event-action="click" data-analytics-event-label="nav link" data-analytics-event-label="nav link" data-analytics-event-type="v1">Github</a>
```
2) Configure gaEventTracking in 2 ways (these examples use jQuery):

Automatic trigger:

```js
$('.myClass').gaEventTracking({
    concatenateLabel: true,     // false: output analytics-event-label attribute value; true: concatenate all 'analytics-event-' attribute values
    concatenateSeparator: '|',  // character used to separate concatenated labels
    send: true,                 // false: output to the console; true: make a call to the ga object. Will output to the console if the ga object has not been defined.
    trigger: 'click'            // DOM event to trigger the ga call - e.g. click, hover, etc
});
```

Manual trigger:

```js
$('.myClass').gaEventTracking({
    concatenateLabel: true,     // false: output analytics-event-label attribute value; true: concatenate all 'analytics-event-' attribute values
    concatenateSeparator: '|',  // character used to separate concatenated labels
    send: true,                 // false: output to the console; true: make a call to the ga object. Will output to the console if the ga object has not been defined.
    trigger: 'manual'            // DOM event to trigger the ga call
});
```

Manual triggers ignore DOM events and are only fired by this call

```js
$('#myLink').gaEventTracking("send");
```

Both the automatic and manual triggers output the same ga() function call.

```js
ga('send', 'event', 'category', 'action', 'label');
```

Where:
- category is the value of the analytics-event-category
- action is the value of the analytics-event-action attribute
- label is used in the concatenation of all analytics-event- attributes. For example, analytics-event-category|analytics-event-action|analytics-event-label|analytics-event-type

And thank you to [Aaron George](https://github.com/AaronGeorge/html5template/) for pointing out that the custom attributes must be data- attributes.
