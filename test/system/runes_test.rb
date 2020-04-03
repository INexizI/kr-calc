require "application_system_test_case"

class RunesTest < ApplicationSystemTestCase
  setup do
    @rune = runes(:one)
  end

  test "visiting the index" do
    visit runes_url
    assert_selector "h1", text: "Runes"
  end

  test "creating a Rune" do
    visit runes_url
    click_on "New Rune"

    click_on "Create Rune"

    assert_text "Rune was successfully created"
    click_on "Back"
  end

  test "updating a Rune" do
    visit runes_url
    click_on "Edit", match: :first

    click_on "Update Rune"

    assert_text "Rune was successfully updated"
    click_on "Back"
  end

  test "destroying a Rune" do
    visit runes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Rune was successfully destroyed"
  end
end
