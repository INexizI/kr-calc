require "application_system_test_case"

class EnchantsTest < ApplicationSystemTestCase
  setup do
    @enchant = enchants(:one)
  end

  test "visiting the index" do
    visit enchants_url
    assert_selector "h1", text: "Enchants"
  end

  test "creating a Enchant" do
    visit enchants_url
    click_on "New Enchant"

    click_on "Create Enchant"

    assert_text "Enchant was successfully created"
    click_on "Back"
  end

  test "updating a Enchant" do
    visit enchants_url
    click_on "Edit", match: :first

    click_on "Update Enchant"

    assert_text "Enchant was successfully updated"
    click_on "Back"
  end

  test "destroying a Enchant" do
    visit enchants_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Enchant was successfully destroyed"
  end
end
