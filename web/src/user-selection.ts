const eventName = "profile-selected";

class ProfileSelectionPublisher {
  public publish(username: string) {
    document.dispatchEvent(new CustomEvent(eventName, { detail: {username} }));
  }
}

class ProfileSelectionSubscriber {
  public subscribe(listener: (e: CustomEvent<{ username: string }>) => void) {
    document.addEventListener(eventName, listener as (e: Event) => void);
  }
}

export { ProfileSelectionPublisher, ProfileSelectionSubscriber };
