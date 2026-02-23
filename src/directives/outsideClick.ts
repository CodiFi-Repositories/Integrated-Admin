import { DirectiveBinding } from 'vue';

const events: string[] = ['click'];

function onClickOutside({
  event,
  el,
  handler,
  middleware,
}: {
  event: MouseEvent;
  el: HTMLElement;
  handler: (event: MouseEvent, el: HTMLElement) => void;
  middleware: (event: MouseEvent, el: HTMLElement) => boolean;
}) {
  const isClickOutside =
    event.target !== el && !el.contains(event.target as Node);

  if (!isClickOutside || !middleware(event, el)) {
    return null;
  }

  return handler(event, el);
}

const instances: Map<
  HTMLElement,
  { event: string; handler: (event: Event) => void }[]
> = new Map();

//Requires loop to toggle events for several listeners of an element
function toggleEventListeners(
  eventHandlers: { event: string; handler: (event: Event) => void }[]
) {
  return (action: 'add' | 'remove') => {
    eventHandlers.forEach(({ event, handler }) => {
      document[`${action}EventListener`](event, handler, true);
    });
  };
}

//Validator function
function processArgs(
  value: Function | { handler: Function; middleware?: Function }
): { handler: Function; middleware: Function } {
  if (typeof value === 'function') {
    return {
      handler: value,
      middleware: () => true,
    };
  }

  return {
    handler: value.handler,
    middleware: value.middleware || (() => true),
  };
}

//Now need adapter to handle several events for one Map element
function eventAdapter(
  el: HTMLElement,
  handler: (event: MouseEvent, el: HTMLElement) => void,
  middleware: (event: MouseEvent, el: HTMLElement) => boolean
) {
  return events.map((eventName) => ({
    event: eventName,
    handler: (event: Event) =>
      onClickOutside({ event: event as MouseEvent, el, handler, middleware }),
  }));
}

function bind(el: HTMLElement, binding: DirectiveBinding) {
  const { handler, middleware } = processArgs(binding.value);
  const eventHandlers = eventAdapter(el, handler as any, middleware as any);

  instances.set(el, eventHandlers);

  toggleEventListeners(eventHandlers)('add');
}

function unbind(el: HTMLElement) {
  const eventHandlers = instances.get(el);

  toggleEventListeners(eventHandlers!)('remove');

  instances.delete(el);
}

const directive = {
  mounted: bind,
  unmounted: unbind,
};

export default directive;
