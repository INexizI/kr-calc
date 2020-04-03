require 'test_helper'

class RunesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @rune = runes(:one)
  end

  test "should get index" do
    get runes_url
    assert_response :success
  end

  test "should get new" do
    get new_rune_url
    assert_response :success
  end

  test "should create rune" do
    assert_difference('Rune.count') do
      post runes_url, params: { rune: {  } }
    end

    assert_redirected_to rune_url(Rune.last)
  end

  test "should show rune" do
    get rune_url(@rune)
    assert_response :success
  end

  test "should get edit" do
    get edit_rune_url(@rune)
    assert_response :success
  end

  test "should update rune" do
    patch rune_url(@rune), params: { rune: {  } }
    assert_redirected_to rune_url(@rune)
  end

  test "should destroy rune" do
    assert_difference('Rune.count', -1) do
      delete rune_url(@rune)
    end

    assert_redirected_to runes_url
  end
end
