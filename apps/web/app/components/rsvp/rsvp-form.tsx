"use client";

export function RsvpForm() {
  return (
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" />
      </label>
      <label>
        Attending:
        <select name="attending">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
